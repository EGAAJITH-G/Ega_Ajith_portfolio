import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Server, Database, Lightbulb, Download, Mail, Sparkles } from 'lucide-react';
import styles from './About.module.css';

// Interactive number counter component
const Counter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value, 10);
    const suffix = value.replace(numericPart.toString(), '');

    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = numericPart;
    const totalSteps = 50;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end + suffix);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start) + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Blurred background shape gradients */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>
      <div className={styles.bgBlob3}></div>

      <div className={styles.aboutContainer}>
        <motion.div
          className={styles.splitLayout}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Column: Developer Image & Decorative Elements */}
          <div className={styles.leftColumn}>
            {/* Dotted Grid Pattern */}
            <div className={styles.dottedGrid}></div>

            {/* Abstract Coding Symbols */}
            <motion.span
              className={`${styles.codeSymbol} ${styles.symbol1}`}
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {"{ }"}
            </motion.span>
            <motion.span
              className={`${styles.codeSymbol} ${styles.symbol2}`}
              animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              {"</>"}
            </motion.span>
            <motion.span
              className={`${styles.codeSymbol} ${styles.symbol3}`}
              animate={{ x: [0, 10, 0], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              {"const"}
            </motion.span>
            <motion.span
              className={`${styles.codeSymbol} ${styles.symbol4}`}
              animate={{ y: [0, -6, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              {"[]"}
            </motion.span>

            {/* Floating Tech Icons */}
            <motion.div
              className={`${styles.techBadge} ${styles.badgeHtml}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className={styles.techBadgeIcon} style={{ color: '#E34F26' }}>HTML</span>
            </motion.div>
            <motion.div
              className={`${styles.techBadge} ${styles.badgeCss}`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className={styles.techBadgeIcon} style={{ color: '#1572B6' }}>CSS</span>
            </motion.div>
            <motion.div
              className={`${styles.techBadge} ${styles.badgeJs}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className={styles.techBadgeIcon} style={{ color: '#F7DF1E' }}>JS</span>
            </motion.div>
            <motion.div
              className={`${styles.techBadge} ${styles.badgeReact}`}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <svg className={styles.spinIcon} viewBox="0 0 100 100" width="16" height="16">
                <circle cx="50" cy="50" r="8" fill="#61DAFB" />
                <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 50 50)" />
              </svg>
              <span>React</span>
            </motion.div>
            <motion.div
              className={`${styles.techBadge} ${styles.badgeNode}`}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            >
              <span className={styles.techBadgeDot} style={{ background: '#339933' }}></span>
              <span>Node</span>
            </motion.div>
            <motion.div
              className={`${styles.techBadge} ${styles.badgeMongo}`}
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            >
              <span className={styles.techBadgeDot} style={{ background: '#47A248' }}></span>
              <span>MongoDB</span>
            </motion.div>

            {/* Main Image Glass Card */}
            <motion.div
              className={styles.imageGlassCard}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.imageInnerContainer}>
                <img
                  src="/images/aboutimgaji34.jpeg"
                  alt="Professional Developer"
                  className={styles.developerImage}
                  onError={(e) => {
                    // Fallback to placeholder avatar if image is missing
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className={styles.cardGlowBorder}></div>
            </motion.div>
          </div>

          {/* Right Column: Information Content */}
          <div className={styles.rightColumn}>
            {/* Small Badge */}
            <motion.div className={styles.sectionBadge} variants={fadeInUpVariants}>
              <Sparkles size={14} className={styles.badgeIcon} />
              <span>About Me</span>
            </motion.div>

            {/* Large Heading */}
            <motion.h2 className={styles.sectionHeading} variants={fadeInUpVariants}>
              Crafting Modern Web Experiences Through Code
            </motion.h2>

            {/* Paragraph Introduction */}
            <motion.p className={styles.sectionParagraph} variants={fadeInUpVariants}>
              {/* I'm Ega Ajith, a passionate Full Stack Developer who loves turning ideas into real-world digital solutions. I specialize in building responsive, user-friendly frontend interfaces and scalable backend systems. With a strong foundation in modern web technologies, I enjoy creating applications that are both visually appealing and technically efficient. <br />

              I continuously explore new technologies, improve my problem-solving skills, and embrace challenges that help me grow as a developer. My goal is to build impactful products that deliver exceptional user experiences and solve real-world problems. */}
              I am Ega ajith Full Stack Developer passionate about building modern, scalable, and user-friendly web applications. I enjoy transforming ideas into powerful digital experiences through clean code, creative design, and continuous learning.
            </motion.p>

            {/* Highlight Cards 2x2 Grid */}
            <motion.div className={styles.highlightsGrid} variants={fadeInUpVariants}>
              <div className={styles.highlightCard}>
                <div className={`${styles.iconContainer} ${styles.blueGlow}`}>
                  <Layout size={20} className={styles.highlightIcon} />
                </div>
                <div>
                  <h4 className={styles.highlightTitle}>Frontend Development</h4>
                  <p className={styles.highlightDesc}>React, Next.js, modern CSS layout systems, responsive UI/UX, and complex interactions.</p>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={`${styles.iconContainer} ${styles.purpleGlow}`}>
                  <Server size={20} className={styles.highlightIcon} />
                </div>
                <div>
                  <h4 className={styles.highlightTitle}>Backend Development</h4>
                  <p className={styles.highlightDesc}>Node.js, Express, asynchronous programming, secure RESTful APIs.</p>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={`${styles.iconContainer} ${styles.greenGlow}`}>
                  <Database size={20} className={styles.highlightIcon} />
                </div>
                <div>
                  <h4 className={styles.highlightTitle}>Database Design</h4>
                  <p className={styles.highlightDesc}>MongoDB, SQL database architectures, query optimization, and data caching strategies.</p>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={`${styles.iconContainer} ${styles.amberGlow}`}>
                  <Lightbulb size={20} className={styles.highlightIcon} />
                </div>
                <div>
                  <h4 className={styles.highlightTitle}>Problem Solving</h4>
                  <p className={styles.highlightDesc}>Writing clean, performant logic, system analysis, and fixing complex runtime bottlenecks.</p>
                </div>
              </div>
            </motion.div>

            {/* Experience Stats */}
            <motion.div className={styles.statsContainer} variants={fadeInUpVariants}>
              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  <Counter value="20" />+
                </h3>
                <p className={styles.statLabel}>Projects Completed</p>
              </div>

              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  <Counter value="15" />+
                </h3>
                <p className={styles.statLabel}>Technologies Learned</p>
              </div>

              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  <Counter value="1" />+ Yrs
                </h3>
                <p className={styles.statLabel}>Internship Experience</p>
              </div>

              <div className={styles.statItem}>
                <h3 className={styles.statNumber}>
                  <Counter value="100" />%
                </h3>
                <p className={styles.statLabel}>Client Satisfaction</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className={styles.ctaRow} variants={fadeInUpVariants}>
              <a href="/doc/ega%20ajith%20g.pdf" target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                <span>Download Resume</span>
                <Download size={18} />
              </a>
              <a href="#contact" className={styles.secondaryButton}>
                <span>Contact Me</span>
                <Mail size={18} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
