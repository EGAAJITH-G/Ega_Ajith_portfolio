import { useState } from 'react';
import PageLoader from './components/PageLoader/PageLoader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import ThreeBackground from './components/ThreeBackground/ThreeBackground';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Process from './components/Process/Process';
import Experience from './components/Experience/Experience';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [isSystemOnline, setIsSystemOnline] = useState(false);

  return (
    <>
      {/* 1. Full-screen Interactive Page Loader */}
      {!isSystemOnline && (
        <PageLoader onLoaded={() => setIsSystemOnline(true)} />
      )}

      {/* 2. Main Site Wrapper (Visible only when system boot is complete) */}
      {isSystemOnline && (
        <>
          {/* Aesthetic Cyberpunk Overlays */}
          <div className="grid-overlay" />

          {/* Interactive Cursor */}
          <CustomCursor />

          {/* Three.js Background Particle Constellation */}
          <ThreeBackground />

          {/* Core Navigation Bar */}
          <Navbar />

          {/* Section 1: Cinematic Video Background Hero */}
          <Hero />

          {/* Section 2: Workspace About Me */}
          <About />

          {/* Section 3: Commands Skills Matrix */}
          <Skills />

          {/* Section 4: Projects Grid Showcase */}
          <Projects />

          {/* Section 5: Work Process Connector Timeline */}
          <Process />

          {/* Section 6: Experience Milestone Timeline */}
          <Experience />

          {/* Section 7: Draggable Certifications Carousel */}
          <Certifications />

          {/* Section 8: Form Contact Console */}
          <Contact />

          {/* Footer & Back to Top */}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
