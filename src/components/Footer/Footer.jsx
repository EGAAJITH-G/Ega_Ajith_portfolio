
import { ArrowUp, Code, Briefcase, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Animated logo */}
        <a href="#hero" className={styles.logo}>
          AJITH.DEV
        </a>

        {/* Social Link Hub */}
        <div className={styles.socials}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} interactive`} aria-label="GitHub">
            <Code size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} interactive`} aria-label="LinkedIn">
            <Briefcase size={20} />
          </a>
          <a href="mailto:ajith@example.com" className={`${styles.socialIcon} interactive`} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Ajith. All rights reserved. Designed for Futuristic Visuals.
        </div>

        {/* Back To Top */}
        <button 
          className={`${styles.backToTopBtn} interactive`}
          onClick={handleScrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
