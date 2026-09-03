import React from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-main-wrapper">
      {/* Layer 0: Background Video */}
      <BackgroundVideo videoSrc="/Krish-video.mp4" />

      {/* Layer 1: 3D Animated Canvas (Three.js) */}
      <ThreeCanvas />

      {/* Layer 2: Foreground UI Content */}
      <div className="app-content-layer">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
