import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroTerminal from './HeroTerminal';
import styles from './Hero.module.css';

const roles = ["FULL STACK DEVELOPER", "MERN STACK DEVELOPER", "FRONTEND DEVELOPER", "UI/UX CREATOR"];

const Hero = ({ isSystemOnline }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Typing animation configuration
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    if (!isSystemOnline) return;

    let timer;
    const activeRole = roles[roleIndex];

    if (!isDeleting) {
      // Typing character
      if (currentText !== activeRole) {
        timer = setTimeout(() => {
          setCurrentText(activeRole.slice(0, currentText.length + 1));
          setTypingSpeed(80);
        }, typingSpeed);
      } else {
        // Pause at the end of typing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      // Deleting character
      timer = setTimeout(() => {
        const nextText = activeRole.slice(0, currentText.length - 1);
        setCurrentText(nextText);
        setTypingSpeed(40);
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed, isSystemOnline]);

  // Parallax effect on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) * -0.015; // Move slightly in opposite direction
      const y = (e.clientY - innerHeight / 2) * -0.015;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Motion variants for text reveals
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  return (
    <section id="hero" className={styles.heroContainer}>
      {/* Radial Dark Gradient Overlay */}
      <div className={styles.overlay} />

      <div className={styles.splitWrapper}>
        {/* Interactive Content */}
        <motion.div
          className={`${styles.heroContent} ${styles.contentActive} ${styles.textCol}`}
          variants={contentVariants}
          initial="hidden"
          animate={isSystemOnline ? "visible" : "hidden"}
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <motion.span variants={itemVariants} className={styles.nameTag}>
            welcome to my portfolio
          </motion.span>

          <motion.h1 variants={itemVariants} className={styles.greetingTitle}>
            HAY! I'M EGA AJITH G
          </motion.h1>

          <motion.h2 variants={itemVariants} className={styles.typedTitle}>
            I'M A <span className={styles.typedHighlight}>{currentText}</span>
          </motion.h2>

          <motion.p variants={itemVariants} className={styles.description}>
            Full Stack Developer Crafting Modern Web Experiences.
            Building scalable applications with clean code, creative design, and AI-powered solutions.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.buttonGroup}>
            <button
              className={`${styles.primaryBtn} cyber-button`}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Projects
            </button>
            <button
              className={`${styles.secondaryBtn} cyber-button`}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hire Me
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.socials}>
            <a href="https://github.com/EGAAJITH-G" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Github">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className={styles.socialLabel}>github.com/EGAAJITH-G</span>
            </a>
            <a href="mailto:egaajith4343@gmail.com" className={styles.socialIcon} aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className={styles.socialLabel}>egaajith4343@gmail.com</span>
            </a>
            <a href="https://wa.me/6380259861" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" stroke="none" />
              </svg>
              <span className={styles.socialLabel}>+91 63802 59861</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Interactive IDE Code Terminal Mockup centerpiece */}
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isSystemOnline ? 1 : 0, x: isSystemOnline ? 0 : 50 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <HeroTerminal />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
