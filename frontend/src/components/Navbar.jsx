import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Send, Menu, X, Download } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`navbar-header ${scrolled ? 'scrolled glass-nav' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <a href="#hero" className="nav-logo" title="Krish Padshala Portfolio" aria-label="Krish Padshala Portfolio">
          <div className="logo-icon-box">
            <Code2 size={20} className="logo-icon" />
          </div>
          <span className="logo-text">Krish<span className="logo-dot"> Padshala</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {isInstallable && (
            <button
              type="button"
              onClick={handleInstallApp}
              className="btn btn-outline btn-nav"
              title="Install Portfolio as App"
            >
              <Download size={14} /> Install App
            </button>
          )}
          <a href="#contact" className="btn btn-primary btn-nav">
            <Send size={15} /> Get in Touch
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-dropdown glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          {isInstallable && (
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                handleInstallApp();
              }}
            >
              <Download size={16} /> Install App
            </button>
          )}
          <a
            href="#contact"
            className="btn btn-primary w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Send size={16} /> Get in Touch
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
