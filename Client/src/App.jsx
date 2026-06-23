import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
// Admin Components
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

// Maintenance Component
import MaintenanceMode from './components/Maintenance/MaintenanceMode';

// Interactive Terminal Component
import TerminalWidget from './components/TerminalWidget/TerminalWidget';

function App() {
  const [isLoaderUnmounted, setIsLoaderUnmounted] = useState(false);
  const [isSystemOnline, setIsSystemOnline] = useState(false);
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [maintenanceEnd, setMaintenanceEnd] = useState(null);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin.aji2004');

  useEffect(() => {
    fetch('/api/analytics/maintenance-status')
      .then(res => res.json())
      .then(data => {
        if (data.maintenanceMode) {
          setIsMaintenanceActive(true);
          setMaintenanceEnd(data.maintenanceEnd);
        }
      })
      .catch(err => console.error('[MAINTENANCE] Error checking status:', err));
  }, []);

  const checkMaintenance = async () => {
    try {
      const res = await fetch('/api/analytics/maintenance-status');
      if (res.ok) {
        const data = await res.json();
        if (!data.maintenanceMode) {
          setIsMaintenanceActive(false);
          setMaintenanceEnd(null);
        } else {
          setMaintenanceEnd(data.maintenanceEnd);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAdminPath) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
  }, [isAdminPath]);

  useEffect(() => {
    // Record page view when visiting the landing home page
    if (location.pathname === '/') {
      fetch('/api/analytics/hit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(err => console.error('[ANALYTICS] Error recording traffic hit:', err));
    }
  }, [location.pathname]);

  return (
    <>
      {/* Interactive Custom Cursor rendered globally on non-admin routes */}
      {!isAdminPath && <CustomCursor />}

      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin.aji2004/login" element={<AdminLogin />} />

        {/* Admin Panel Route */}
        <Route path="/admin.aji2004" element={<AdminDashboard />} />

        {/* Public Portfolio Route */}
        <Route 
          path="/" 
          element={
            isMaintenanceActive ? (
              <MaintenanceMode checkStatus={checkMaintenance} maintenanceEnd={maintenanceEnd} />
            ) : (
              <>
                {/* 1. Main Site Wrapper (Mounted early in the background for a smooth transition) */}
                <div className={`siteWrapper ${isSystemOnline ? 'siteWrapperActive' : ''}`}>
                  {/* Aesthetic Cyberpunk Overlays */}
                  <div className="grid-overlay" />

                  {/* Core Navigation Bar */}
                  <Navbar />

                  {/* Section 1: Cinematic Video Background Hero */}
                  <Hero isSystemOnline={isSystemOnline} />

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

                  {/* Interactive CLI Terminal Widget */}
                  <TerminalWidget />

                  {/* Cyberpunk 3D Background */}
                  <ThreeBackground/>
                </div>

                {/* 2. Full-screen Page Loader on top */}
                {!isLoaderUnmounted && (
                  <PageLoader 
                    onExitStart={() => setIsSystemOnline(true)}
                    onLoaded={() => setIsLoaderUnmounted(true)} 
                  />
                )}
              </>
            )
          } 
        />
      </Routes>
    </>
  );
}

export default App;
