import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.EMAIL_TO || 'business@taksharatechnologies.com';

// Middleware
app.use(cors());
app.use(express.json());

// Transporter Configuration
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Local test mode if credentials not provided
  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, company, inquiryType, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (First Name, Last Name, Email, Message).',
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Website Enquiry from ${firstName} ${lastName}`,
      text: `
New Enquiry from Takshara Technologies Website:

Name: ${firstName} ${lastName}
Business Email: ${email}
Company: ${company || 'N/A'}
Inquiry Type: ${inquiryType || 'General'}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #003d9b; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Takshara Technologies Website Enquiry</h2>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <p style="font-size: 16px; margin-top: 0;">You received a new message from the contact form:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; font-weight: bold; width: 140px; border-bottom: 1px solid #f1f5f9;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Company:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Inquiry Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-transform: capitalize;">${inquiryType || 'General'}</td>
              </tr>
            </table>
            <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #003d9b; border-radius: 4px; margin-top: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #003d9b;">Message:</h4>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #334155;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px; background-color: #f1f5f9; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px;">
            Sent from Takshara Payments Website Contact Form
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Contact Form] Email sent successfully to ${RECIPIENT_EMAIL}:`, info.messageId || 'Success');

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will reply shortly!',
    });
  } catch (error) {
    console.error('[Contact Form Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message due to a server error. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

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
