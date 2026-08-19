import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.EMAIL_TO || 'business@taksharatechnologies.com';

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root endpoint for Render deployment health check
app.get('/', (req, res) => {
  res.json({
    service: 'Takshara Contact API',
    status: 'Active',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact Form Routes
app.use('/api/contact', contactRoutes);

// Server startup
app.listen(PORT, async () => {
  console.log(`\n==================================================`);
  console.log(`Takshara Backend Server running on http://localhost:${PORT}`);
  console.log(`Enquiries recipient email: ${RECIPIENT_EMAIL}`);

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log(`Status: 🟢 Real SMTP Email Sending Enabled (${process.env.SMTP_USER})`);
  } else {
    console.log(`Status: ⚠️ Real SMTP Credentials Missing!`);
    console.log(`👉 Form submissions will log to server console. To receive real emails in ${RECIPIENT_EMAIL}, set SMTP_USER and SMTP_PASS in your .env file.`);
  }
  console.log(`==================================================\n`);
});
