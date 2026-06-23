import { useState, useEffect, useRef } from 'react';
import { Terminal, X, Volume2, VolumeX } from 'lucide-react';
import { playClickSound, playTypeSound, getMuteState, setMuteState, subscribeToMuteChange } from '../../utils/soundUtils';
import styles from './TerminalWidget.module.css';

const TerminalWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { text: 'EGA AJITH G // SYSTEM TERMINAL v1.0', type: 'info' },
    { text: 'Type "help" for a list of available commands.', type: 'muted' },
    { text: '', type: 'spacer' }
  ]);
  const [muted, setMuted] = useState(getMuteState());
  const consoleBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToMuteChange((newMuted) => {
      setMuted(newMuted);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const targetState = !muted;
    setMuted(targetState);
    setMuteState(targetState);
    playClickSound();
  };

  const handleToggleOpen = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    playTypeSound();
    setInputVal(e.target.value);
  };

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    // Add user command to history
    const newHistory = [...history, { text: `> ${cmdText}`, type: 'user' }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'header' },
          { text: '  about    - Brief profile biography of Ajith', type: 'info' },
          { text: '  skills   - Showcase engineering capabilities', type: 'info' },
          { text: '  projects - List published showcase repositories', type: 'info' },
          { text: '  contact  - Display communication channels', type: 'info' },
          { text: '  mute     - Toggle mechanical sound FX', type: 'info' },
          { text: '  clear    - Clear console logs', type: 'info' },
          { text: '  close    - Exit console shell', type: 'info' }
        );
        break;

      case 'about':
        newHistory.push(
          { text: '--- PROFILE SPECIFICATION ---', type: 'header' },
          { text: 'Name: EGA AJITH G', type: 'info' },
          { text: 'Role: Full-Stack Developer & UI Designer', type: 'info' },
          { text: 'Focus: High-Performance Web Apps, WebGL particle systems, Express APIs', type: 'info' },
          { text: 'Credentials: B.E. Computer Science, 2024 graduate', type: 'info' }
        );
        break;

      case 'skills':
        newHistory.push(
          { text: '--- ENGINEERING MATRICES ---', type: 'header' },
          { text: 'Frontend:  React, Redux, HTML5/CSS3, Tailwind CSS, Framer Motion, Three.js', type: 'info' },
          { text: 'Backend:   Node.js, Express.js, JWT, RESTful APIs', type: 'info' },
          { text: 'Database:  MongoDB, Mongoose ODM, SQL basics', type: 'info' },
          { text: 'DevOps:    Git, Docker, Vercel deployments, CI/CD pipelines', type: 'info' }
        );
        break;

      case 'projects':
        newHistory.push(
          { text: '--- PUBLISHED PROJECTS ---', type: 'header' },
          { text: '1. Flower Shop - Premium full-stack retail ecommerce (React, Node, Mongo, Stripe)', type: 'info' },
          { text: '2. Vetri Flex - Interactive streaming interface with carousels (React, Framer Motion)', type: 'info' },
          { text: '3. MERN Ecommerce - Robust e-commerce layout with dashboard controller (MERN)', type: 'info' },
          { text: '4. AI Portfolio - Cinematic portfolio with custom particles HUD (Three.js, GSAP)', type: 'info' }
        );
        break;

      case 'contact':
        newHistory.push(
          { text: '--- COMMUNICATION CHANNELS ---', type: 'header' },
          { text: 'Email:  ajithaji2004@gmail.com', type: 'info' },
          { text: 'GitHub: https://github.com/EGAAJITH-G', type: 'info' },
          { text: 'Admin:  https://localhost:5000/admin.aji2004', type: 'info' }
        );
        break;

      case 'mute':
        const targetState = !muted;
        setMuted(targetState);
        setMuteState(targetState);
        newHistory.push({ text: `Mechanical sounds ${targetState ? 'MUTED' : 'ENABLED'}.`, type: 'success' });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'close':
        setIsOpen(false);
        break;

      default:
        newHistory.push({
          text: `Command not found: "${trimmed}". Type "help" to see available commands.`,
          type: 'error'
        });
        break;
    }

    newHistory.push({ text: '', type: 'spacer' });
    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playClickSound();
      executeCommand(inputVal);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={styles.floatingBtn} 
        onClick={handleToggleOpen} 
        aria-label="Open CLI Terminal"
      >
        <Terminal size={22} />
      </button>

      {/* Terminal Screen Overlay */}
      {isOpen && (
        <div className={styles.terminalOverlay} onClick={handleToggleOpen}>
          <div 
            className={styles.terminalWindow} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header */}
            <div className={styles.windowHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.dotRed} />
                <div className={styles.dotYellow} />
                <div className={styles.dotGreen} />
                <span className={styles.windowTitle}>ajith_g@dev: ~</span>
              </div>
              <div className={styles.headerRight}>
                <button 
                  className={styles.muteBtn} 
                  onClick={toggleMute} 
                  title={muted ? 'Unmute mechanical click sounds' : 'Mute click sounds'}
                >
                  {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button 
                  className={styles.closeBtn} 
                  onClick={handleToggleOpen}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Body Console */}
            <div className={styles.terminalBody} onClick={() => inputRef.current?.focus()}>
              <div className={styles.scanlines} />
              
              <div className={styles.historyLogs}>
                {history.map((log, index) => (
                  <div 
                    key={index} 
                    className={`${styles.logLine} ${styles[log.type]}`}
                  >
                    {log.text}
                  </div>
                ))}
                <div ref={consoleBottomRef} />
              </div>

              {/* Input Command Line */}
              <div className={styles.inputLine}>
                <span className={styles.prompt}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.terminalInput}
                  value={inputVal}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Enter command..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalWidget;
