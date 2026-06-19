
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const Experience = () => {
  const milestones = [
    {
      date: '2025 - PRESENT',
      role: 'Lead Full Stack Developer',
      company: 'Cybercorp Systems',
      side: styles.milestoneLeft,
      details: [
        'Designed real-time WebSocket telemetry portals, handling 50k concurrent requests.',
        'Developed performant, responsive frontend components integrated with WebGL maps.',
        'Mentored and guided a team of 4 junior developers to enforce solid architectural clean code.'
      ]
    },
    {
      date: '2023 - 2025',
      role: 'Senior Frontend Architect',
      company: 'Nexus Technologies',
      side: styles.milestoneRight,
      details: [
        'Optimized asset compilation setups, reducing initial load latency parameters by 45%.',
        'Implemented state-of-the-art GSAP timeline animations for interactive landing pages.',
        'Drafted responsive user flows for cross-browser, cross-device compatibility.'
      ]
    },
    {
      date: '2021 - 2023',
      role: 'Full Stack Developer',
      company: 'Digital Labs Ltd',
      side: styles.milestoneLeft,
      details: [
        'Maintained and tested RESTful API endpoints running on high-scale Express routing.',
        'Constructed database schemas, improving MySQL indexing metrics by 20%.',
        'Structured modular CSS and HTML templates, facilitating codebase reusability.'
      ]
    }
  ];

  const cardVariants = (isLeft) => ({
    hidden: { 
      opacity: 0, 
      x: isLeft ? -80 : 80 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  });

  return (
    <section 
      id="experience" 
      className={styles.experienceSection}
      style={{ backgroundImage: 'url("/images/experience-bg.png")' }}
    >
      <div className={styles.experienceContainer}>
        <div className="section-header">
          <span className="section-subtitle">Chronology</span>
          <h2 className="section-title">Experience Timeline</h2>
        </div>

        <div className={styles.timeline}>
          {/* Central timeline core wire */}
          <div className={styles.timelineLine} />

          {milestones.map((ms, idx) => {
            const isLeft = ms.side === styles.milestoneLeft;
            
            return (
              <div key={idx} className={`${styles.milestone} ${ms.side}`}>
                {/* Node Dot */}
                <div className={styles.timelineBadge} />

                {/* Glass Card */}
                <motion.div 
                  className={`${styles.milestoneCard} interactive`}
                  variants={cardVariants(isLeft)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <span className={styles.dateText}>{ms.date}</span>
                  <h3 className={styles.jobTitle}>{ms.role}</h3>
                  <div className={styles.company}>{ms.company}</div>
                  
                  <ul className={styles.detailsList}>
                    {ms.details.map((detail, dIdx) => (
                      <li key={dIdx} className={styles.detailItem}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
