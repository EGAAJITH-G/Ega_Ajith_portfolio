import { ArrowUp } from 'lucide-react';
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
          EGA AJITH<span className={styles.logoDot}>.DEV</span>
        </a>

        {/* Social Link Hub */}
        <div className={styles.socials}>
          <a href="https://github.com/EGAAJITH-G" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.githubIcon} interactive`} aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.875 8.167 6.84 9.49.5.09.68-.22.68-.48 0-.23-.01-.86-.01-1.69-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.57.69.48C19.13 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ega-ajith-g2004/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.linkedinIcon} interactive`} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="https://wa.me/6380259861" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.whatsappIcon} interactive`} aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.335-1.662c1.746.953 3.71 1.456 5.705 1.458h.005c5.554 0 10.05-4.512 10.053-10.07.002-2.693-1.047-5.225-2.953-7.133-1.907-1.908-4.435-2.96-7.126-2.962-5.556 0-10.055 4.512-10.058 10.071a9.989 9.989 0 001.531 5.234l-.361.214-3.741.982.998-3.648-.235-.374a9.96 9.96 0 00-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
          </a>
          <a href="mailto:egaajith4343@gmail.com" className={`${styles.socialIcon} ${styles.emailIcon} interactive`} aria-label="Email">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} EGA AJITH G. All rights reserved. Designed for Futuristic Visuals.
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
