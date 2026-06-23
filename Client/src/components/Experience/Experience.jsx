
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const Experience = () => {
  const milestones = [
    {
      date: '2026 - PRESENT',
      role: 'Full Stack Developer',
      company: 'SoftnovaTech',
      side: styles.milestoneLeft,
      details: [
        'Built and deployed full stack web applications using React, Node.js, Express.js, and MySQL, Mongo DB.',
        'Worked on real-world and live projects, implementing frontend, backend, and database functionalities.',
        'Developed strong skills in API integration, authentication, debugging, and scalable application development.'
      ]
    },
    {
      date: '2025',
      role: 'Full Stack Developer Intern',
      company: 'Softnovatech',
      side: styles.milestoneRight,
      details: [
        'Developed responsive web applications using React, Node.js, Express.js, and MySQL.',
        'Worked on API integration, database management, and authentication features.',
        'Enhanced problem-solving abilities through real-world projects and collaborative development'
      ]
    },
    {
      date: '2025',
      role: 'Full Stack Developer Training',
      company: 'Softnovatech',
      side: styles.milestoneLeft,
      details: [
        'Learned the fundamentals of frontend development using HTML, CSS, JavaScript, and React.',
        'Explored backend development concepts with Node.js, Express.js, and MySQL.',
        'Practiced building full stack applications and improved problem-solving and debugging skills.'
      ]
    },
    {
      date: '2021 - 2025',
      role: 'B-Tech Biotechnology',
      company: 'KIT-KalaignarKarunanidhi Institute Of Technology',
      side: styles.milestoneRight,
      details: [
        'I have completed a Bachelors degree in Biotechnology, which provided me with a strong foundation in biological sciences, research methodologies, and analytical thinking.',
        'Mini Project- Production and purification of Sucrose hydrolyzing Enzyme from bacterial source.',
        'Project Enzymatic degradation of reactive BLACK 5 by extracellular enzyme from Staphylococcus haemolyticus.'
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
