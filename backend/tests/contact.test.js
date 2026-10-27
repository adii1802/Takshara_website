import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';
import * as emailService from '../src/services/email.service.js';

describe('Cairnloop Contact API Test Suite', () => {
  let server;
  let baseUrl;

  before(async () => {
    // Start server on an ephemeral port
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  const validPayload = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    company: 'Acme Corp',
    inquiryType: 'Enterprise Payments',
    message: 'We are interested in integrating Cairnloop payment gateway.',
  };

  describe('1. Form Validation', () => {
    it('should reject request missing first name and last name', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'jane@example.com',
          message: 'Hello',
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
      assert.match(body.message, /Full name is required/i);
    });

    it('should reject request missing email', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Doe',
          message: 'Hello',
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
      assert.match(body.message, /Email address is required/i);
    });

    it('should reject invalid email format', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validPayload,
          email: 'not-an-email',
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
      assert.match(body.message, /valid email/i);
    });

    it('should reject email header CRLF injection attempts', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validPayload,
          email: 'jane@example.com\r\nBcc: victim@example.com',
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
    });

    it('should reject CRLF injection in name field', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validPayload,
          firstName: 'Jane\r\nHeader-Injection',
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
      assert.match(body.message, /Invalid characters/i);
    });

    it('should reject message that exceeds maximum length of 5000 characters', async () => {
      const longMessage = 'A'.repeat(5001);
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validPayload,
          message: longMessage,
        }),
      });

      const body = await res.json();
      assert.equal(res.status, 400);
      assert.equal(body.success, false);
      assert.match(body.message, /maximum allowed length/i);
    });
  });

  describe('2. Delivery & Environment Handling', () => {
    let originalApiKey;
    let originalNodeEnv;

    beforeEach(() => {
      originalApiKey = process.env.RESEND_API_KEY;
      originalNodeEnv = process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env.RESEND_API_KEY = originalApiKey;
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should return 503 if RESEND_API_KEY is missing in production environment', async () => {
      delete process.env.RESEND_API_KEY;
      process.env.NODE_ENV = 'production';
      delete process.env.ALLOW_DEV_FALLBACK;

      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validPayload),
      });

      const body = await res.json();
      assert.equal(res.status, 503);
      assert.equal(body.success, false);
      assert.match(body.message, /Server email credentials are not configured/i);
    });

    it('should succeed in development mode with simulated fallback if key is missing', async () => {
      delete process.env.RESEND_API_KEY;
      process.env.NODE_ENV = 'development';

      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validPayload),
      });

      const body = await res.json();
      assert.equal(res.status, 200);
      assert.equal(body.success, true);
      assert.match(body.message, /inquiry has been received/i);
    });
  });

  describe('3. Proxy Trust and Rate Limiting', () => {
    it('should trust X-Forwarded-For from 1 hop and return rate limit headers', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '203.0.113.195',
        },
        body: JSON.stringify(validPayload),
      });

      assert.ok(res.headers.has('ratelimit-limit') || res.headers.has('x-ratelimit-limit'));
      const limit = res.headers.get('ratelimit-limit') || res.headers.get('x-ratelimit-limit');
      assert.equal(limit, '10');
    });
  });

  describe('4. CORS Policy', () => {
    it('should allow requests from verified Vercel domains (*.vercel.app)', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://cairnloop-preview.vercel.app',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      assert.equal(
        res.headers.get('access-control-allow-origin'),
        'https://cairnloop-preview.vercel.app'
      );
    });

    it('should allow requests from cairnlooptechnologies.com', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://cairnlooptechnologies.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      assert.equal(
        res.headers.get('access-control-allow-origin'),
        'https://cairnlooptechnologies.com'
      );
    });

    it('should allow requests from www.cairnlooptechnologies.com', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://www.cairnlooptechnologies.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      assert.equal(
        res.headers.get('access-control-allow-origin'),
        'https://www.cairnlooptechnologies.com'
      );
    });

    it('should block unauthorized origins', async () => {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          Origin: 'https://malicious-site.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validPayload),
      });

      // Centralized error handler catches CORS rejection with 403
      assert.equal(res.status, 403);
    });
  });

  describe('5. Health Check Endpoint', () => {
    it('GET /api/contact/status returns health info', async () => {
      const res = await fetch(`${baseUrl}/api/contact/status`);
      const body = await res.json();
      assert.equal(res.status, 200);
      assert.equal(body.provider, 'resend');
      assert.ok('message' in body);
    });

    it('GET /api/health returns 200 OK', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      const body = await res.json();
      assert.equal(res.status, 200);
      assert.equal(body.status, 'OK');
    });
  });
});
