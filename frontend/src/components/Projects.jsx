import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Sparkles, Bot, Brain, Mic, MessageCircle } from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsData = [
  {
    id: 1,
    title: 'JARVIS — Mark VII Neural Interface',
    category: 'AI Voice Assistant & HUD',
    icon: <Bot size={20} className="project-card-icon" />,
    description: 'Futuristic AI-powered holographic HUD and voice command interface with offline tactical intelligence, speech synthesis, and PWA capabilities.',
    tags: ['React', 'Vite', 'Web Speech API', 'PWA', 'TailwindCSS', 'Futuristic HUD'],
    github: 'https://github.com/Krish2035/Jarvis',
    demo: 'https://jarvis-zk6d.vercel.app/',
    featured: true,
    accentColor: '#14b8a6',
    bgImage: '/projects/jarvis-preview.png'
  },
  {
    id: 2,
    title: 'NeuroChat AI Chatbot',
    category: 'AI & Vector Memory RAG',
    icon: <Brain size={20} className="project-card-icon" />,
    description: 'Full-stack AI assistant with persistent vector memory using Groq LLM (LLaMA 3), PostgreSQL pgvector memory recall, Hugging Face embeddings, and offline PWA.',
    tags: ['Next.js', 'Groq LLM', 'PostgreSQL', 'pgvector', 'Hugging Face', 'PWA'],
    github: 'https://github.com/Krish2035/AI-Chatbot',
    demo: 'https://ai-chatbot-nine-delta.vercel.app/',
    featured: true,
    accentColor: '#6366f1',
    bgImage: '/projects/neurochat-preview.png'
  },
  {
    id: 3,
    title: 'Voiceflow AI Chatbot',
    category: 'Voice AI & Dialog Systems',
    icon: <Mic size={20} className="project-card-icon" />,
    description: 'Conversational voice assistant powered by Voiceflow, Groq LLM, and PostgreSQL memory with real-time speech interaction and responsive audio visualizer.',
    tags: ['React', 'Voiceflow API', 'Groq LLM', 'PostgreSQL', 'Web Speech API', 'PWA'],
    github: 'https://github.com/Krish2035/AI-Chatbot-voiceflow',
    demo: 'https://ai-chatbot-voiceflow.vercel.app/',
    featured: false,
    accentColor: '#06b6d4',
    bgImage: '/projects/voiceflow-preview.png'
  },
  {
    id: 4,
    title: 'WhatsApp Web Clone',
    category: 'Full-Stack & Real-Time Chat',
    icon: <MessageCircle size={20} className="project-card-icon" />,
    description: 'Feature-rich WhatsApp Web clone with real-time messaging, responsive dark mode UI, media support, chat persistence, and PWA installability.',
    tags: ['Next.js', 'React', 'WebSockets', 'TailwindCSS', 'PWA', 'Responsive UI'],
    github: 'https://github.com/Krish2035/whatsapp-clone',
    demo: 'https://whatsapp-clone-nu-lyart.vercel.app/',
    featured: false,
    accentColor: '#10b981',
    bgImage: '/projects/whatsapp-preview.png'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            <Layers size={14} /> Portfolio Showcase
          </span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A showcase of production-ready AI agents, voice assistants, real-time communications, and modern web applications.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card glass-panel ${project.featured ? 'featured-card' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Project Screenshot Background Image */}
              <div className="project-card-bg">
                <img
                  src={project.bgImage}
                  alt={`${project.title} Preview`}
                  className="project-bg-img"
                  loading="lazy"
                />
                <div className="project-bg-overlay" />
              </div>

              <div className="project-card-content">
                <div className="project-card-header">
                  <div className="project-header-left">
                    <div
                      className="project-icon-box"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}44`,
                        background: `${project.accentColor}20`
                      }}
                    >
                      {project.icon}
                    </div>
                    <span
                      className="project-badge"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}50`,
                        background: `${project.accentColor}22`
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <span className="featured-pill">
                      <Sparkles size={11} /> Featured
                    </span>
                  )}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    className="project-link-btn"
                    title="View Source Code on GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon size={16} /> Code
                  </a>
                  <a
                    href={project.demo}
                    className="project-link-btn primary"
                    title="View Live Demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
