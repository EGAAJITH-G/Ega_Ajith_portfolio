import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Cpu, Code, Network, History, Award, Mail } from 'lucide-react';
import { playClickSound } from '../../utils/soundUtils';
import styles from './Navbar.module.css';

const navLinks = [
  { id: 'hero', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Cpu },
  { id: 'projects', label: 'PROJECTS', icon: Code },
  { id: 'process', label: 'PROCESS', icon: Network },
  { id: 'experience', label: 'TIMELINE', icon: History },
  { id: 'certifications', label: 'AWARDS', icon: Award },
  { id: 'contact', label: 'CONTACT', icon: Mail }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Section intersection observer to toggle active class
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset for trigger point
      
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }

      // Scroll progress bar calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (id) => {
    playClickSound();
    setIsMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.dock} ${isScrolled ? styles.dockScrolled : ''} ${isMobileMenuOpen ? styles.dockOpen : ''}`}>
        {/* Cyberpunk corner details for high-tech aesthetic */}
        <div className={`${styles.cornerTrim} ${styles.topLeft}`} />
        <div className={`${styles.cornerTrim} ${styles.topRight}`} />
        <div className={`${styles.cornerTrim} ${styles.bottomLeft}`} />
        <div className={`${styles.cornerTrim} ${styles.bottomRight}`} />

        {/* Branding Logo */}
        <div className={styles.logo} onClick={() => handleNavClick('hero')}>
          EGA AJITH<span className={styles.logoDot}>.DEV</span>
        </div>

        {/* Navigation Items (Desktop) */}
        <div className={styles.navMenu}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`${styles.navItem} ${activeSection === link.id ? styles.active : ''} interactive`}
            >
              <link.icon size={18} className={styles.navIcon} />
              <span className={styles.navText}>{link.label}</span>
              <span className={styles.tooltip}>{link.label}</span>
              {activeSection === link.id && (
                <motion.span
                  layoutId="activePill"
                  className={styles.activeIndicatorPill}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Hamburger Trigger for Mobile */}
        <button 
          className={`${styles.hamburger} interactive`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`} />
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen : ''}`} />
        </button>

        {/* Small Scroll Timeline Gauge */}
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressBar} 
            style={{ '--scroll-progress': `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNavOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.mobileNavMenu} onClick={(e) => e.stopPropagation()}>
            <div className={`${styles.cornerTrim} ${styles.topLeft}`} />
            <div className={`${styles.cornerTrim} ${styles.bottomRight}`} />
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`${styles.mobileNavItem} ${activeSection === link.id ? styles.mobileActive : ''}`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <div className={styles.mobileActiveDot} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
