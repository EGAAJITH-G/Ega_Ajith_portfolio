import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const Skills = () => {
  // Brand color SVGs and detail data for all 18 skills
  const skillsData = [
    {
      category: 'Frontend Development',
      class: styles.frontendCard,
      items: [
        {
          name: 'HTML5',
          level: 95,
          desc: 'Building semantic and accessible web structures.',
          color: '#E34F26',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h10.438l.233-2.625H5.875l.698 7.875h7.106l-.23 2.597-2.472.668-2.47-.668-.158-1.782H6.012l.314 3.53 5.651 1.527 5.65-1.527.625-7.042H8.531z" />
            </svg>
          )
        },
        {
          name: 'CSS3',
          level: 90,
          desc: 'Creating responsive and modern user interfaces.',
          color: '#1572B6',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.09 6.25h10.74l-.232 2.625H9.208l.232 2.625h7.02l-.625 7.042-3.858 1.042-3.856-1.042-.25-2.812h2.612l.125 1.406 1.369.37 1.37-.37.288-3.25H6.83l-.24-2.625h10.74l.232-2.625H6.59l-.02-2.625z" />
            </svg>
          )
        },
        {
          name: 'JavaScript',
          level: 90,
          desc: 'Developing dynamic and interactive web experiences.',
          color: '#F7DF1E',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M0 0h24v24H0V0zm22.034 18.268c-.153-.787-.728-1.352-1.713-1.637-.621-.186-1.423-.338-1.986-.532-.676-.231-.83-.492-.83-.812 0-.323.23-.615.8-.812.287-.092.83-.153 1.306-.015.426.123.738.4.846.862h2.523c-.154-1.846-1.321-2.923-3.23-3.215-.785-.123-1.677-.046-2.338.215-1.399.538-2.199 1.492-2.199 2.876 0 1.261.646 2.062 1.846 2.507.8.293 1.8.492 2.476.677.677.185.83.477.83.846 0 .4-.385.738-1.077.738-.723 0-1.169-.307-1.338-.846h-2.583c.123 1.876 1.445 2.938 3.522 3.107.877.062 1.769-.077 2.415-.354 1.445-.6 2.199-1.584 2.199-3.045 0-1.123-.538-1.938-1.785-2.384zm-11.474-4.891h-2.584v7.907c0 1.139-.078 1.954-.369 2.446-.308.538-.83.815-1.538.815-.693 0-1.17-.261-1.462-.784-.308-.554-.385-1.339-.385-2.539H1.614c0 2.215.138 3.6.83 4.568.754 1.047 2.062 1.508 3.738 1.508 1.631 0 2.861-.508 3.615-1.477.723-.97.83-2.354.83-4.63V13.377z" />
            </svg>
          )
        },
        {
          name: 'React.js',
          level: 88,
          desc: 'Building scalable component-based applications.',
          color: '#61DAFB',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
              <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          )
        },

        {
          name: 'Bootstrap',
          level: 92,
          desc: 'Rapid development of responsive layouts.',
          color: '#7952B3',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M11.3 2C5.7 2 1.2 6.5 1.2 12s4.5 10 10.1 10h6.1c3.1 0 5.6-2.5 5.6-5.6V12c0-5.5-4.5-10-10.1-10zm-1.8 14.8H7.1V7.2h2.5c1.4 0 2.5.3 3.1.9s1 .15 1 1.2c0 .9-.5 1.5-1.4 1.8.9.3 1.6.9 1.6 1.9 0 1.1-.4 1.9-1.2 2.5-.8.5-1.9.9-3.2.9zm1.8-6.1c0-.6-.3-1-1-1H8.7v2h1.6c.7 0 1-.4 1-1zm.4 3.7c0-.7-.4-1.1-1.1-1.1H8.7v2.2h1.9c.7 0 1.1-.4 1.1-1.1z" />
            </svg>
          )
        }
      ]
    },
    {
      category: 'Backend Development',
      class: styles.backendCard,
      items: [
        {
          name: 'Node.js',
          level: 85,
          desc: 'Developing scalable server-side applications.',
          color: '#339933',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M12 .397L2.246 6.03v11.27l9.754 5.632 9.754-5.631V6.029L12 .397zm-.45 20.312l-7.755-4.48V7.288l7.755 4.478v8.943zm8.204-4.48l-7.755 4.48v-8.943l7.755-4.478v8.941z" />
            </svg>
          )
        },
        {
          name: 'Express.js',
          level: 85,
          desc: 'Building RESTful APIs and backend services.',
          color: '#828282',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <text x="1" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.8">ex</text>
              <circle cx="20" cy="8" r="3" />
            </svg>
          )
        },
        {
          name: 'MongoDB',
          level: 82,
          desc: 'Managing NoSQL databases efficiently.',
          color: '#47A248',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M12 0C10.74 0 9.21 2.94 8.78 5.76c-.66 4.31.81 8.84 3.22 13.56.55 1.08 1 2.05 1.34 2.96.11-.9-.23-1.92-.71-2.96-2.2-4.72-3.47-9.25-2.81-13.56.37-2.45 1.58-4.96 2.18-5.76.6.8 1.81 3.31 2.18 5.76.66 4.31-.61 8.84-2.81 13.56-.48 1.04-.82 2.06-.71 2.96.34-.91.79-1.88 1.34-2.96 2.41-4.72 3.88-9.25 3.22-13.56C14.79 2.94 13.26 0 12 0z" />
            </svg>
          )
        },
        {
          name: 'Mongoose',
          level: 80,
          desc: 'Simplifying MongoDB data modeling.',
          color: '#880000',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <rect x="2" y="2" width="8" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="8" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M6 8v6c0 1 1 2 2 2h6" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="6" cy="14" r="1.5" />
            </svg>
          )
        },
        {
          name: 'JWT Authentication',
          level: 85,
          desc: 'Implementing secure user authentication.',
          color: '#d63aff',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z" />
            </svg>
          )
        },
        {
          name: 'REST API',
          level: 88,
          desc: 'Designing structured communication between systems.',
          color: '#00b4d8',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <circle cx="5" cy="12" r="3" />
              <circle cx="19" cy="5" r="3" />
              <circle cx="19" cy="19" r="3" />
              <path d="M7.7 10.8l8.6-4.1M7.7 13.2l8.6 4.1" stroke="currentColor" strokeWidth="2" />
            </svg>
          )
        }
      ]
    },
    {
      category: 'Tools & Technologies',
      class: styles.toolsCard,
      items: [
        {
          name: 'Git',
          level: 90,
          desc: 'Version control and collaboration.',
          color: '#F05032',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M20.6 10.1L13.9 3.4c-.8-.8-2-.8-2.8 0L7.8 6.7l2.5 2.5c.6-.2 1.3-.1 1.9.4.5.5.7 1.2.5 1.9l2.5 2.5c.7-.2 1.4 0 1.9.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.9l-2.5-2.5c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3L6 9.6v5.8c.6.2 1.1.8 1.1 1.5 0 .9-.8 1.7-1.7 1.7s-1.7-.8-1.7-1.7c0-.7.5-1.3 1.1-1.5V8.1c-.6-.2-1.1-.8-1.1-1.5 0-.9.8-1.7 1.7-1.7.7 0 1.3.5 1.5 1.1l3.3-3.3c1.5-1.5 4-1.5 5.5 0l6.7 6.7c1.5 1.5 1.5 4 0 5.5l-2.4 2.4-2.5-2.5 2.4-2.4c.8-.7.8-2 0-2.8z" />
            </svg>
          )
        },
        {
          name: 'GitHub',
          level: 92,
          desc: 'Managing repositories and team workflows.',
          color: '#ffffff',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          )
        },
        {
          name: 'VS Code',
          level: 95,
          desc: 'Primary development environment.',
          color: '#007ACC',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M23.15 2.587L17.51.474a.75.75 0 0 0-.96.39L11.56 12 8.35 9.6a.75.75 0 0 0-1.02.09L.41 16.14a.75.75 0 0 0 .02 1.07l4.7 4.11a.75.75 0 0 0 .99-.04l5.44-4.8 5.6 4.15a.75.75 0 0 0 1.02-.09l5.24-5.38a.75.75 0 0 0 .18-.5V3.08a.75.75 0 0 0-.41-.493zM18 16.5v-9l3.5 4.5L18 16.5z" />
            </svg>
          )
        },
        {
          name: 'Figma',
          level: 75,
          desc: 'UI/UX collaboration and design.',
          color: '#F24E1E',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm8 8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z" />
            </svg>
          )
        },
        {
          name: 'Netlify / Vercel',
          level: 85,
          desc: 'Deployment and hosting platforms.',
          color: '#00F5FF',
          icon: (
            <svg viewBox="0 0 24 24" className={styles.techIcon}>
              <path d="M24 22.525H0L12 1.475l12 21.05z" />
            </svg>
          )
        }
      ]
    }
  ];

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="skills"
      className={styles.skillsSection}
    style={{ backgroundImage: 'url("/images/image.png")' }}
    >
      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Technical Skills</span>
          <h2 className="section-title">Skills Center</h2>
          <p className={styles.sectionDescription}>
            Technologies and tools I use to build modern, scalable, and high-performance web applications.
          </p>
        </div>

        {/* 3 Skill Category Cards */}
        <motion.div
          className={styles.categoriesWrapper}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillsData.map((categoryGroup, index) => (
            <motion.div
              key={index}
              className={`${styles.categoryCard} ${categoryGroup.class}`}
              variants={cardVariants}
            >
              <h3 className={styles.categoryTitle}>{categoryGroup.category}</h3>

              {/* Grid of Skill Items inside the Card */}
              <div className={styles.skillsGrid}>
                {categoryGroup.items.map((skill, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className={styles.skillItem}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                  >
                    <div className={styles.skillTop}>
                      {/* Icon wrapper with custom hover brand color */}
                      <div
                        className={styles.iconWrapper}
                        style={{ '--brand-color': skill.color }}
                      >
                        {skill.icon}
                      </div>
                      <div className={styles.skillMeta}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <p className={styles.skillDesc}>{skill.desc}</p>
                      </div>
                      <span className={styles.skillPercentage}>{skill.level}%</span>
                    </div>

                    {/* Progress Bar with viewport fill animation */}
                    <div className={styles.progressBarTrack}>
                      <motion.div
                        className={styles.progressBarFill}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
