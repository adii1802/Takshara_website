import { sendContactEmail } from '../services/email.service.js';

export const handleContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, company, inquiryType, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (First Name, Last Name, Email, Message).',
      });
    }

    await sendContactEmail({ firstName, lastName, email, company, inquiryType, message });

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
};
