import { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';

const bootLogs = [
  "INITIALIZING CORE SYSTEM CONFIG...",
  "ESTABLISHING CYBER CONNECTION...",
  "RESOLVING PORTFOLIO DIRECTORIES...",
  "LOADING THREE.JS PARTICLE MATRIX...",
  "MOUNTING SCI-FI HUD GRAPHICS...",
  "COMPILING CUSTOM DESIGN STYLES...",
  "VERIFYING CREDENTIAL SIGNATURES...",
  "BOOT SUCCESSFUL. READY FOR DEPLOY."
];

const PageLoader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random progress increments
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 800); // Wait slightly for transition
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoaded]);

  const currentLogIndex = Math.floor((progress / 100) * bootLogs.length);
  const logs = bootLogs.slice(0, Math.min(currentLogIndex + 1, bootLogs.length));


  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        {/* Glowing circular scanner */}
        <div className={styles.circularScanner}>
          <div className={styles.innerGlow} />
          <span className={styles.progressPercentage}>{progress}%</span>
        </div>

        {/* Terminal logs list */}
        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.terminalTitle}>System Boot Core</span>
          </div>
          <div className={styles.terminalBody}>
            {logs.map((log, index) => (
              <div key={index} className={styles.logLine}>
                <span className={styles.prompt}>&gt;&gt;</span> {log}
              </div>
            ))}
            {progress < 100 && (
              <div className={styles.cursorBlink}>&gt;&gt; LOAD_SYS_SERVICES...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
