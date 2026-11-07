import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare, Tag, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null, message: '' });

    try {
      // 1. Deliver message directly to Krish's inbox (krishpadshala2035@gmail.com) via FormSubmit
      const formSubmitPayload = {
        name: formData.name,
        email: formData.email,
        _subject: `[Portfolio Recruiter Connect] ${formData.subject || 'New message from ' + formData.name}`,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        _template: 'table',
        _captcha: 'false'
      };

      const emailResponse = await fetch('https://formsubmit.co/ajax/krishpadshala2035@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmitPayload)
      });

      // 2. Also record in Node/Express backend + MongoDB if available
      try {
        await axios.post('http://localhost:5000/api/contact', formData);
      } catch {
        // Local backend recording is optional
      }

      if (emailResponse.ok) {
        setStatus({
          loading: false,
          success: true,
          error: null,
          message: "Thank you! Your message has been sent directly to Krish's email inbox (krishpadshala2035@gmail.com)."
        });

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errData = await emailResponse.json().catch(() => ({}));
        throw new Error(errData.message || 'Delivery service was unable to forward the email.');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Unable to deliver message right now. You can email directly to krishpadshala2035@gmail.com.',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Mail size={14} /> Contact & Inquiries
          </span>
          <h2 className="section-title">Let's Connect & Work Together</h2>
          <p className="section-description">
            Recruiters, hiring managers, and collaborators can reach Krish Padshala directly using the form below. Messages are delivered straight to my email inbox at krishpadshala2035@gmail.com.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Information Sidebar */}
          <motion.div
            className="contact-info-card glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Recruiter Quick Connect</h3>
            <p className="info-intro">
              I am currently open to full-time roles, freelance opportunities, and technical collaborations.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><Mail size={18} /></div>
                <div>
                  <span className="info-label">Direct Email</span>
                  <a href="mailto:krishpadshala2035@gmail.com" className="info-value">krishpadshala2035@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><User size={18} /></div>
                <div>
                  <span className="info-label">Role Preference</span>
                  <span className="info-value">Full-Stack / React / Next.js / Node.js / Express / MongoDB / PostgreSQL / MySQL</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Tag size={18} /></div>
                <div>
                  <span className="info-label">Availability</span>
                  <span className="info-value text-accent">● Immediate Joiner</span>
                </div>
              </div>
            </div>

            <div className="backend-badge-note">
              <span>⚡ Direct delivery to krishpadshala2035@gmail.com</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-card glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name"><User size={14} /> Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"><Mail size={14} /> Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sara.jenkins@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject"><Tag size={14} /> Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Recruitment / Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message"><MessageSquare size={14} /> Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Krish, I reviewed your 3D portfolio and would love to discuss a full-stack role..."
                  required
                ></textarea>
              </div>

              {/* Status Feedback Banners */}
              {status.success && (
                <div className="status-box success">
                  <CheckCircle2 size={18} />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="status-box error">
                  <AlertCircle size={18} />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-submit w-full"
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    <Loader2 size={18} className="spinner" /> Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message to Recruiter Inbox
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
