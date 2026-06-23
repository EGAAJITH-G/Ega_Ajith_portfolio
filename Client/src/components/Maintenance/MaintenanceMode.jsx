import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, RefreshCw, Terminal, ShieldAlert } from 'lucide-react';
import styles from './MaintenanceMode.module.css';

const MaintenanceMode = ({ checkStatus, maintenanceEnd }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [logs, setLogs] = useState([
    '[SYS] Connection routed to security standby gateway.',
    '[SYS] PUBLIC PORTFOLIO INTERFACE INJECTOR: OFFLINE',
    '[DB] Syncing metadata profiles and caching indexes...',
    '[SYS] Initiating core background firmware check...'
  ]);
  const [timeLeft, setTimeLeft] = useState('');
  const terminalEndRef = useRef(null);

  const mockLogsList = [
    '[SYS] Scanning local storage volumes: 100% SECURE.',
    '[DB] Connection Pool: Active (Mongoose Standby Mode).',
    '[SYS] Refreshing telemetry routing buffer arrays.',
    '[SYS] Cleaning stale session log logs.',
    '[SYS] Core CPU engine load nominal (3% active).',
    '[DB] Integrity check complete. 0 database anomalies found.',
    '[SYS] Standing by for administrator signals...',
    '[SYS] Auto-caching portfolio assets for next handshake.',
    '[SYS] Security firewalls validated: 100% ONLINE.'
  ];

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Countdown timer logic
  useEffect(() => {
    if (!maintenanceEnd) {
      setTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const diff = new Date(maintenanceEnd) - new Date();
      if (diff <= 0) {
        setTimeLeft('Handshake imminent...');
        clearInterval(interval);
        if (checkStatus) checkStatus();
      } else {
        const totalSecs = Math.floor(diff / 1000);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        setTimeLeft(`RE-ESTABLISHING IN: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [maintenanceEnd, checkStatus]);

  // Append logs periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const randomLog = mockLogsList[Math.floor(Math.random() * mockLogsList.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomLog}`]);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const handleManualCheck = async () => {
    setIsChecking(true);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] [SYS] Manual handshake ping dispatched...`]);
    
    // Call parent check function
    if (checkStatus) {
      await checkStatus();
    }

    setTimeout(() => {
      setIsChecking(false);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [SYS] Handshake complete. Site is still in maintenance mode.`]);
    }, 1200);
  };

  return (
    <div className={styles.maintenanceContainer}>
      {/* Dynamic Cyberpunk grid overlay */}
      <div className={styles.gridOverlay} />

      <div className={styles.hudPanel}>
        {/* Rotating Orbits Background decoration */}
        <div className={styles.orbitContainer}>
          <div className={styles.orbitRingOuter} />
          <div className={styles.orbitRingInner} />
        </div>

        {/* HUD Content Header */}
        <div className={styles.hudHeader}>
          <div className={styles.warningIconWrapper}>
            <AlertTriangle className={styles.warningIcon} size={28} />
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.hudTitle}>GATEWAY STATUS: OFFLINE</h1>
            <p className={styles.hudSubtitle}>
              SYSTEM MAINTENANCE & PROJECT INTEGRITY UPGRADE IN PROGRESS
            </p>
            {timeLeft && (
              <div style={{ 
                marginTop: '8px', 
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                color: '#ff3b7e', 
                fontFamily: 'monospace',
                textShadow: '0 0 8px #ff3b7e',
                letterSpacing: '1px'
              }}>
                [ {timeLeft} ]
              </div>
            )}
          </div>
        </div>

        {/* Central Terminal Console */}
        <div className={styles.consoleBox}>
          <div className={styles.terminalHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} style={{ color: '#ff3b7e' }} />
              <span>DIAGNOSTIC SHELL TELEMETRY</span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <span className={styles.windowDot} style={{ backgroundColor: '#ff5f56' }} />
              <span className={styles.windowDot} style={{ backgroundColor: '#ffbd2e' }} />
              <span className={styles.windowDot} style={{ backgroundColor: '#27c93f' }} />
            </div>
          </div>

          <div className={styles.terminalBody}>
            {logs.map((log, index) => (
              <div 
                key={index} 
                className={`${styles.logRow} ${log.includes('[ERR]') ? styles.logRowErr : log.includes('[SYS]') ? styles.logRowSys : styles.logRowDb}`}
              >
                {log}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* HUD Footer Status & Actions */}
        <div className={styles.hudFooter}>
          <div className={styles.alertBar}>
            <ShieldAlert size={14} style={{ flexShrink: 0 }} />
            <span>CRITICAL INJECTOR ONLINE. VISITORS WILL BE RECONNECTED AUTOMATICALLY.</span>
          </div>

          <div className={styles.actionRow}>
            <button 
              className={styles.checkBtn} 
              onClick={handleManualCheck}
              disabled={isChecking}
            >
              <RefreshCw size={14} className={isChecking ? styles.spinIcon : ''} />
              <span>{isChecking ? 'PINGING...' : 'RE-VERIFY CONNECTION'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;
