import dotenv from 'dotenv';
import app from './src/app.js';
import { verifySmtpConnection } from './src/services/email.service.js';

// Load environment variables from backend/.env
dotenv.config();

const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.CONTACT_TO || process.env.EMAIL_TO || 'contact@cairnlooptechnologies.com';
const SENDER_EMAIL = process.env.CONTACT_FROM || 'Cairnloop Technologies <contact@cairnlooptechnologies.com>';
const HAS_RESEND_KEY = Boolean(process.env.RESEND_API_KEY?.trim());

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n=============================================================`);
  console.log(`  Cairnloop Technologies — Contact API Backend`);
  console.log(`=============================================================`);
  console.log(`• Server running on:     http://localhost:${PORT}`);
  console.log(`• Environment:           ${process.env.NODE_ENV || 'development'}`);
  console.log(`• Proxy Trust:           🟢 Trust 1 Hop (Render reverse proxy)`);
  console.log(`• Email Provider:        Resend HTTPS API`);
  console.log(`• Inquiries Recipient:   ${RECIPIENT_EMAIL}`);
  console.log(`• Sender Address:        ${SENDER_EMAIL}`);

  if (HAS_RESEND_KEY) {
    console.log(`• Resend API Key:        🟢 Configured`);
  } else {
    console.log(`• Resend API Key:        ⚠️  Missing`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`• Dev Mode Fallback:     🟢 Active (inquiries will log to console without failing)`);
    }
    console.log(`\n💡 Setup Instructions for Render / Production:`);
    console.log(`   1. In Render Dashboard -> Environment:`);
    console.log(`   2. Add RESEND_API_KEY=re_your_api_key`);
    console.log(`   3. Add CONTACT_TO=${RECIPIENT_EMAIL}`);
    console.log(`   4. Add CONTACT_FROM=${SENDER_EMAIL}`);
  }
  console.log(`=============================================================\n`);
});

// Graceful shutdown handling
const handleShutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}. Closing HTTP server...`);
  server.close(() => {
    console.log('[Server] HTTP server closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default server;
