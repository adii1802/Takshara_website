import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { handleContactForm, checkSmtpHealth } from '../controllers/contact.controller.js';

// Rate limiter: Max 10 requests per 15-minute window per IP to prevent spam and abuse
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per 15-minute window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP. Please wait 15 minutes before trying again.',
  },
});

const router = Router();

// POST /api/contact - Submits inquiry form
router.post('/', contactRateLimiter, handleContactForm);

// GET /api/contact/status - Checks SMTP connectivity status
router.get('/status', checkSmtpHealth);

export default router;
