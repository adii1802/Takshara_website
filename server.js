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
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465, // true for port 465, false for port 587 / 25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
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
    const senderEmail = process.env.SMTP_USER || email;

    const mailOptions = {
      from: `"${firstName} ${lastName} (via Website Form)" <${senderEmail}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${firstName} ${lastName}" <${email}>`,
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
    console.log(`[Contact Form] Admin notification email sent successfully to ${RECIPIENT_EMAIL}:`, info.messageId || 'Success');

    // Send confirmation auto-reply email to the user if SMTP credentials are active
    if (process.env.SMTP_USER && process.env.SMTP_PASS && email) {
      try {
        const autoReplyOptions = {
          from: `"Takshara Technologies" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Thank you for contacting Takshara Technologies, ${firstName}!`,
          text: `
Dear ${firstName} ${lastName},

Thank you for contacting Takshara Technologies! We have received your message regarding "${inquiryType || 'General Inquiry'}".

Our team is reviewing your message and will get back to you as soon as possible (typically within 24 business hours).

Summary of your submitted request:
- Name: ${firstName} ${lastName}
- Company: ${company || 'N/A'}
- Inquiry: ${inquiryType || 'General'}
- Message: ${message}

Best Regards,
The Takshara Technologies Team
business@taksharatechnologies.com
          `.trim(),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <div style="background-color: #003d9b; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Thank You for Reaching Out!</h2>
                <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 14px;">Takshara Technologies</p>
              </div>
              <div style="padding: 24px; color: #1e293b;">
                <p style="font-size: 16px; margin-top: 0;">Dear <strong>${firstName} ${lastName}</strong>,</p>
                <p style="line-height: 1.6; color: #334155;">
                  Thank you for contacting Takshara Technologies. We have received your inquiry and our team is currently reviewing your message. We aim to respond within 24 business hours.
                </p>
                <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #003d9b; border-radius: 4px; margin: 20px 0;">
                  <h4 style="margin: 0 0 8px 0; color: #003d9b;">Your Submitted Details:</h4>
                  <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
                  <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Company:</strong> ${company || 'N/A'}</p>
                  <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Message:</strong> ${message}</p>
                </div>
                <p style="line-height: 1.6; color: #334155;">If you have any urgent questions, feel free to reply directly to this email or call us at <strong>+91 7089185703</strong>.</p>
              </div>
              <div style="padding: 16px; background-color: #f1f5f9; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px;">
                © Takshara Technologies | Gwalior, Madhya Pradesh, India
              </div>
            </div>
          `,
        };
        await transporter.sendMail(autoReplyOptions);
        console.log(`[Contact Form] Confirmation auto-reply email sent to ${email}`);
      } catch (replyErr) {
        console.warn('[Contact Form Auto-reply Error]:', replyErr.message);
      }
    }

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
