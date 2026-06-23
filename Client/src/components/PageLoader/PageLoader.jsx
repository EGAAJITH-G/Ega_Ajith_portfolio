import { useState, useEffect } from 'react';
import styles from './PageLoader.module.css';



const PageLoader = ({ onExitStart, onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [diagnostics, setDiagnostics] = useState({
    res: '1920x1080',
    time: '',
    os: 'CLIENT_OS'
  });

  // 1. Progress simulator
  useEffect(() => {
    // 400ms delay to let the browser mount background components and compile WebGL shaders
    const startTimeout = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Snappy initial progress leap, then smooth loading
          let increment = Math.floor(Math.random() * 8) + 4;
          if (prev < 30) {
            increment = Math.floor(Math.random() * 12) + 8; // Faster jump at the start
          }
          const next = prev + increment;
          return next > 100 ? 100 : next;
        });
      }, 35); // 35ms interval for snappier startup

      // Clean up interval if unmounted
      return () => clearInterval(progressInterval);
    }, 10);

    return () => clearTimeout(startTimeout);
  }, []);



  // 3. Completion transitions
  useEffect(() => {
    if (progress === 100) {
      if (onExitStart) onExitStart();
      setIsExiting(true);
      const timeout = setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 1200); // 1.2s to match the sliding gate animation transition duration in CSS
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoaded, onExitStart]);

  // 4. Mouse movement tracking for parallax and diagnostics coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorCoords({ x: e.clientX, y: e.clientY });
      
      // Relative offset from screen center (-0.5 to 0.5)
      const rx = (e.clientX / window.innerWidth) - 0.5;
      const ry = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x: rx, y: ry });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 5. System diagnostics detection
  useEffect(() => {
    const detectOS = () => {
      const ua = window.navigator.userAgent;
      if (ua.indexOf("Windows") !== -1) return "WINDOWS_OS";
      if (ua.indexOf("Mac") !== -1) return "MAC_OS";
      if (ua.indexOf("Linux") !== -1) return "LINUX_OS";
      if (ua.indexOf("Android") !== -1) return "ANDROID_OS";
      if (ua.indexOf("iPhone") !== -1) return "IOS_OS";
      return "UNIX_SYSTEM";
    };

    setDiagnostics({
      res: `${window.innerWidth}x${window.innerHeight}`,
      time: new Date().toLocaleTimeString(),
      os: detectOS()
    });

    const clockInterval = setInterval(() => {
      setDiagnostics(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString()
      }));
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);



  // Parallax offsets for HUD layers
  const parallaxOuterStyle = {
    transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`
  };
  const parallaxInnerStyle = {
    transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)`
  };
  const parallaxCenterStyle = {
    transform: `translate(${mousePos.x * 32}px, ${mousePos.y * 32}px)`
  };

  return (
    <div className={`${styles.loaderContainer} ${isExiting ? styles.exiting : ''}`}>
      {/* Background CRT scanline and moving grid */}
      <div className={styles.scanline} />
      <div className={styles.gridBackground} />

      {/* Diagonal sliding gate panels */}
      <div className={`${styles.gate} ${styles.gateLeft}`}>
        {/* Glowing laser boundary line */}
        <svg className={styles.seamSVG} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="55" y1="0" x2="45" y2="100" className={styles.seamLine} />
        </svg>

        {/* Diagnostic data pinned to left side corners */}
        <div className={`${styles.cornerInfo} ${styles.topLeft}`}>
          <span className={styles.infoLabel}>SYSTEM NODE</span>
          <span className={styles.infoValue}>LOC // 127.0.0.1</span>
        </div>
        <div className={`${styles.cornerInfo} ${styles.bottomLeft}`}>
          <span className={styles.infoLabel}>CLOCK TIMELINE</span>
          <span className={styles.infoValue}>{diagnostics.time}</span>
        </div>
      </div>

      <div className={`${styles.gate} ${styles.gateRight}`}>
        {/* Mirror of glowing laser boundary line */}
        <svg className={styles.seamSVG} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="55" y1="0" x2="45" y2="100" className={styles.seamLine} />
        </svg>

        {/* Diagnostic data pinned to right side corners */}
        <div className={`${styles.cornerInfo} ${styles.topRight}`}>
          <span className={styles.infoLabel}>PLATFORM MATRIX</span>
          <span className={styles.infoValue}>{diagnostics.os} // {diagnostics.res}</span>
        </div>
        <div className={`${styles.cornerInfo} ${styles.bottomRight}`}>
          <span className={styles.infoLabel}>INTERACTION VECTORS</span>
          <span className={styles.infoValue}>X:{cursorCoords.x} Y:{cursorCoords.y}</span>
        </div>
      </div>

      {/* Main loading content block */}
      <div className={`${styles.loaderContent} ${isExiting ? styles.fadeOut : ''}`}>
        
        {/* Holographic Core Centerpiece */}
        <div className={styles.hudContainer}>
          {/* Tech Ring 1: Decagon mesh */}
          <div className={styles.hudHexagonWrapper} style={parallaxOuterStyle}>
            <svg className={`${styles.hudCircle} ${styles.hexRing}`} viewBox="0 0 120 120">
              <polygon 
                points="60,6 92,16 112,44 112,76 92,104 60,114 28,104 8,76 8,44 28,16" 
                stroke="rgba(255, 26, 26, 0.08)" 
                strokeWidth="1.5" 
                fill="none" 
              />
              <polygon 
                points="60,6 92,16 112,44 112,76 92,104 60,114 28,104 8,76 8,44 28,16" 
                stroke="var(--accent-red)" 
                strokeWidth="2.5" 
                strokeDasharray="25 35" 
                strokeLinecap="round" 
                fill="none" 
              />
            </svg>
          </div>

          {/* Tech Ring 2: Rotating crosshair */}
          <div className={styles.hudHexagonWrapper} style={parallaxInnerStyle}>
            <svg className={`${styles.hudCircle} ${styles.orbitRing}`} viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" stroke="rgba(255, 26, 26, 0.05)" strokeWidth="1" fill="none" />
              <circle cx="60" cy="60" r="48" stroke="rgba(255, 26, 26, 0.5)" strokeWidth="1.5" strokeDasharray="10 50 20 40" fill="none" />
            </svg>
            <svg className={`${styles.hudCircle} ${styles.radarRing}`} viewBox="0 0 120 120">
              <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(255, 26, 26, 0.15)" strokeWidth="0.8" strokeDasharray="4 6" />
              <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255, 26, 26, 0.15)" strokeWidth="0.8" strokeDasharray="4 6" />
              <circle cx="60" cy="60" r="38" stroke="rgba(255, 26, 26, 0.25)" strokeWidth="1.2" strokeDasharray="5 35" fill="none" />
            </svg>
          </div>

          {/* Liquid Core Reactor */}
          <div className={styles.gooeyContainer} style={parallaxCenterStyle}>
            <svg className={styles.gooeySVG}>
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
            <div className={styles.gooeyBlobWrapper}>
              <div className={`${styles.blob} ${styles.blobCenter}`} />
              <div className={`${styles.blob} ${styles.blobOrbital1}`} />
              <div className={`${styles.blob} ${styles.blobOrbital2}`} />
              <div className={`${styles.blob} ${styles.blobOrbital3}`} />
            </div>
            {/* Overlay brand logo inside reactor */}
            <div className={styles.hudLogoText}>EA</div>
          </div>
        </div>

        {/* Brand Group */}
        <div className={styles.brandGroup}>
          <h2 className={styles.brandTitle}>
            EGA AJITH<span className={styles.brandDot}>.DEV</span>
          </h2>
          <p className={styles.brandSubtitle}>NEURAL PORTFOLIO OS v2.0</p>
        </div>



        {/* Segmented Energy progress charging bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>COGNITIVE LINKAGE STATUS</span>
            <span className={styles.progressPercent}>{progress}%</span>
          </div>
          <div className={styles.segmentedBar}>
            {Array.from({ length: 20 }).map((_, index) => {
              const segmentThreshold = (index + 1) * 5;
              const isActive = progress >= segmentThreshold;
              return (
                <div
                  key={index}
                  className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PageLoader;
