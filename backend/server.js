import dotenv from 'dotenv';
import app from './src/app.js';
import { verifySmtpConnection } from './src/services/email.service.js';

// Load environment variables from backend/.env
dotenv.config();

const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.CONTACT_TO || process.env.EMAIL_TO || 'Contact@cairnlooptechnologies.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = process.env.SMTP_PORT || 465;

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n=============================================================`);
  console.log(`  Cairnloop Technologies — Contact API Backend`);
  console.log(`=============================================================`);
  console.log(`• Server running on:     http://localhost:${PORT}`);
  console.log(`• Environment:           ${process.env.NODE_ENV || 'development'}`);
  console.log(`• SMTP Host:             ${SMTP_HOST}:${SMTP_PORT} (SSL: ${process.env.SMTP_SECURE !== 'false'})`);
  console.log(`• Inquiries Recipient:   ${RECIPIENT_EMAIL}`);

  // Test Hostinger SMTP connection on startup
  const smtpStatus = await verifySmtpConnection();
  if (smtpStatus.connected) {
    console.log(`• SMTP Status:           🟢 ${smtpStatus.message}`);
  } else {
    console.log(`• SMTP Status:           ⚠️  ${smtpStatus.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`• Dev Mode Fallback:     🟢 Active (inquiries will log to console without throwing errors)`);
    }
    console.log(`\n💡 Setup Instructions for Live Delivery:`);
    console.log(`   1. Open 'backend/.env'`);
    console.log(`   2. Set SMTP_USER=contact@cairnlooptechnologies.com`);
    console.log(`   3. Set SMTP_PASS=your-hostinger-password`);
    console.log(`   4. Set CONTACT_TO=${RECIPIENT_EMAIL}`);
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
