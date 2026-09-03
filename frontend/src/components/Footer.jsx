import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import './Footer.css';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-left">
          <p className="footer-logo">Krish<span>.dev</span></p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Krish. Built with React, Vite, Three.js, Framer Motion, Node & Express.
          </p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/Krish2035" target="_blank" rel="noreferrer" className="footer-icon-link" title="GitHub Profile">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-icon-link">
            <LinkedinIcon size={18} />
          </a>
          <a href="mailto:krishpadshala2035@gmail.com" className="footer-icon-link" title="Email krishpadshala2035@gmail.com">
            <Mail size={18} />
          </a>
        </div>

        <button onClick={scrollToTop} className="scroll-top-btn" title="Back to Top">
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
