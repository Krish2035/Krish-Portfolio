const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Helper function to send email notification to portfolio owner
const sendEmailNotification = async ({ name, email, subject, message }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP credentials not provided in .env; skipping email send.');
    return { success: false, reason: 'SMTP credentials missing' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL || 'krishpadshala2035@gmail.com',
      subject: `[Portfolio Inquiry] ${subject || 'New Contact Request'}`,
      text: `You received a new inquiry from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #6366f1;">New Portfolio Inquiry</h2>
          <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <h4 style="margin-bottom: 8px;">Message:</h4>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 6px;">${message}</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email notification sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Email send failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// @route   POST /api/contact
// @desc    Submit contact form message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields: name, email, and message.'
      });
    }

    let savedContact = null;
    let dbStatus = 'disconnected';

    try {
      // Save contact to MongoDB if database is connected
      const newContact = new Contact({ name, email, subject, message });
      savedContact = await newContact.save();
      dbStatus = 'saved';
    } catch (dbErr) {
      console.warn('MongoDB save fallback (DB not reachable):', dbErr.message);
    }

    // Trigger email notification
    const emailResult = await sendEmailNotification({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: savedContact || { name, email, subject, message },
      dbStatus,
      emailSent: emailResult.success
    });
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while sending your message. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all messages (for admin dashboard / testing)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
