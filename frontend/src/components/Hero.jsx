import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Terminal } from 'lucide-react';
import './Hero.css';


const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">


        {/* Main Heading */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafting High-Performance <br />
          <span className="gradient-text">Full-Stack Web</span> Experiences
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hi, I'm <strong className="text-white">Krish</strong>. I architect resilient web applications using modern full-stack technologies (React, Vite, Node.js, Express, MongoDB) enhanced with immersive Three.js geometries and smooth Framer Motion animations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects" className="btn btn-primary">
            Explore Work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn btn-outline">
            <Mail size={16} /> Contact Me
          </a>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          className="tech-pills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="tech-pill"><Terminal size={14} /> React + Vite</span>
          <span className="tech-pill">Node.js + Express</span>
          <span className="tech-pill">MongoDB</span>
          <span className="tech-pill">Three.js</span>
          <span className="tech-pill">Framer Motion</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
