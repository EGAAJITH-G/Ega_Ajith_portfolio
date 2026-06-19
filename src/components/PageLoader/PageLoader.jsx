import { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';

const PageLoader = ({ onExitStart, onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulated smooth progress increments
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 800;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      if (onExitStart) onExitStart();
      setIsExiting(true);
      const timeout = setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 600); // Delay unmount for exit animation to play out
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoaded, onExitStart]);

  return (
    <div className={`${styles.loaderContainer} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.loaderContent}>
        {/* Brand Logo Header */}
        <div className={styles.logo}>
          EGA AJITH<span className={styles.logoDot}>.DEV</span>
        </div>

        {/* Minimalist Linear Progress Bar */}
        <div className={styles.progressBarTrack}>
          <div 
            className={styles.progressBarFill} 
            style={{ '--progress-width': `${progress}%` }}
          />
        </div>

        {/* Percentage and Status Details */}
        <div className={styles.progressDetails}>
          <span className={styles.statusText}>LOADING SYSTEM...</span>
          <span className={styles.percentageText}>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
