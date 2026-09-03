import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Box, Sparkles } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Frontend Engineering',
    icon: <Layout className="cat-icon" size={24} />,
    color: '#6366f1',
    skills: ['React.js', 'Vite', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS']
  },
  {
    title: 'Backend Architecture',
    icon: <Server className="cat-icon" size={24} />,
    color: '#8b5cf6',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Middleware']
  },
  {
    title: 'Database & Cloud',
    icon: <Database className="cat-icon" size={24} />,
    color: '#14b8a6',
    skills: ['MongoDB', 'Mongoose ODM', 'Atlas Cloud', 'CRUD Operations', 'Indexing']
  },
  {
    title: '3D & Animations',
    icon: <Box className="cat-icon" size={24} />,
    color: '#a855f7',
    skills: ['Three.js', 'React Three Fiber', 'Framer Motion', '3D Particle Fields', 'Canvas Shaders']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Sparkles size={14} /> Expertise & Stack
          </span>
          <h2 className="section-title">Technical Proficiency</h2>
          <p className="section-description">
            A comprehensive overview of my core technology stack for modern full-stack application development.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="skill-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="card-top">
                <div className="cat-icon-wrapper" style={{ background: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <h3 className="cat-title">{cat.title}</h3>
              </div>

              <ul className="skill-list">
                {cat.skills.map((skill) => (
                  <li key={skill} className="skill-item">
                    <span className="bullet" style={{ background: cat.color }}></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
