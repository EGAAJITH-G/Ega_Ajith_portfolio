import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';
import styles from './Process.module.css';

const Process = () => {
  const steps = [
    {
      icon: <Search size={24} />,
      title: "RESEARCH",
      desc: "Analyzing user needs and detailing software specifications.",
      color: styles.cyanBorder
    },
    {
      icon: <PenTool size={24} />,
      title: "DESIGN",
      desc: "Creating wireframes, interactive UI prototypes, and themes.",
      color: styles.violetBorder
    },
    {
      icon: <Code size={24} />,
      title: "DEVELOP",
      desc: "Coding scalable frontend pages and robust backend cores.",
      color: styles.pinkBorder
    },
    {
      icon: <CheckCircle size={24} />,
      title: "TESTING",
      desc: "Running Unit, Integration, and visual rendering validations.",
      color: styles.cyanBorder
    },
    {
      icon: <Rocket size={24} />,
      title: "DEPLOY",
      desc: "Launching production bundles to secure cloud networks.",
      color: styles.violetBorder
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="process"
      className={styles.processSection}
      style={{ backgroundImage: 'url("/images/process-bg.png")' }}
    >
      <div className={styles.processContainer}>
        <div className="section-header">
          <span className="section-subtitle">Workflow</span>
          <h2 className="section-title">My Work Process</h2>
        </div>

        <motion.div
          className={styles.stepsFlow}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <Fragment key={index}>
              {/* Step Card */}
              <motion.div
                className={`${styles.stepCard} ${step.color} interactive`}
                variants={stepVariants}
              >
                <div className={styles.iconWrapper}>
                  {step.icon}
                </div>
                <div className={styles.stepBadge}>0{index + 1}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>

              {/* Connecting line (don't show after last step) */}
              {index < steps.length - 1 && (
                <div className={styles.connectorLine}>
                  <div className={styles.pulseDot} />
                </div>
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
