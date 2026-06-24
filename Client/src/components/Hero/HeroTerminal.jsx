import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, FileJson, FileCode, Play, TerminalSquare, AlertCircle } from 'lucide-react';
import styles from './HeroTerminal.module.css';

const codeSnippet = `class SoftwareDeveloper {
  constructor() {
    this.name = "Ega Ajith G";
    this.role = "Full Stack Engineer";
    this.location = "Chennai, India";
    this.passion = "High-Performance Web Apps";
  }

  getSkills() {
    return {
      frontend: ["React", "Redux", "Tailwind", "Motion"],
      backend:  ["Node.js", "Express", "JWT", "REST API"],
      database: ["MongoDB", "Mongoose", "SQL"],
      devops:   ["Git", "Docker", "Vercel", "CI/CD"]
    };
  }

  getCurrentMotto() {
    return "Transforming code into creative digital reality";
  }
}`;

const HeroTerminal = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  
  // Terminal compiler states
  const [compilerStep, setCompilerStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);

  // 1. Typing animation loop for code area
  useEffect(() => {
    if (charIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + codeSnippet[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 12); // Speed up typing slightly
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedCode('');
        setCharIndex(0);
      }, 20000); // Hold for 20 seconds before repeating
      return () => clearTimeout(timer);
    }
  }, [charIndex]);

  // 2. Simulated compiler and live logs loop
  useEffect(() => {
    // Step 0: Initializing
    if (compilerStep === 0) {
      setTerminalLogs([{ text: '$ npm run dev', type: 'command' }]);
      const timer = setTimeout(() => setCompilerStep(1), 800);
      return () => clearTimeout(timer);
    }
    
    // Step 1: Compiling progress bar
    if (compilerStep === 1) {
      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
        }, 120);
        return () => clearTimeout(timer);
      } else {
        setCompilerStep(2);
      }
    }

    // Step 2: Compiled success and start Vite server
    if (compilerStep === 2) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: '  VITE v8.0.16 ready in 482 ms', type: 'info' },
        { text: '  ➜  Local:   http://localhost:5173/', type: 'info' },
        { text: '  ➜  Network: use --host to expose', type: 'muted' },
        { text: '✓ compilation successful. telemetries active.', type: 'success' }
      ]);
      const timer = setTimeout(() => setCompilerStep(3), 1200);
      return () => clearTimeout(timer);
    }

    // Step 3: Endless scrolling telemetry logs
    if (compilerStep === 3) {
      const logTemplates = [
        { text: '[DATABASE] Mongoose buffer matching collections...', type: 'db' },
        { text: '[DATABASE] Client session synchronized successfully.', type: 'success' },
        { text: '[SYS] V8 engine heap usage: 48.6 MB (stable).', type: 'info' },
        { text: '[SYS] Dynamic port routing validated on SSL gateway.', type: 'info' },
        { text: '[TELEMETRY] Listening on active websocket stream...', type: 'warning' },
        { text: '[TRAFFIC] Unique visitor hit logged from 127.0.0.1.', type: 'success' },
        { text: '[AUTH] Verified administrator token (ADMIN_AJITH).', type: 'success' }
      ];

      const timer = setTimeout(() => {
        const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setTerminalLogs((prev) => [
          ...prev.slice(-30), // keep last 30 logs to avoid memory bloat
          { text: `[${timestamp}] ${randomLog.text}`, type: randomLog.type }
        ]);
      }, Math.random() * 4000 + 2000); // Add a new log every 2-6 seconds
      return () => clearTimeout(timer);
    }
  }, [compilerStep, progress]);

  // Syntax highlighter for JavaScript code snippet
  const renderHighlightedCode = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\b(class|constructor|this|return|new)\b/g, '<span class="' + styles.keyword + '">$1</span>')
      .replace(/\b(getSkills|getCurrentMotto)\b/g, '<span class="' + styles.method + '">$1</span>')
      .replace(/(".*?")/g, '<span class="' + styles.string + '">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="' + styles.number + '">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="' + styles.comment + '">$1</span>');
  };

  // Build progress bar string
  const getProgressBar = () => {
    const barsCount = Math.floor(progress / 8);
    const filled = '█'.repeat(barsCount);
    const empty = '░'.repeat(12 - barsCount);
    return `[${filled}${empty}] ${progress}% compiling...`;
  };

  return (
    <div className={styles.terminalWrapper}>
      {/* Floating 3D Parallax Background Elements */}
      <motion.div 
        className={`${styles.floatingElement} ${styles.floatReact}`}
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        ⚛
      </motion.div>
      <motion.div 
        className={`${styles.floatingElement} ${styles.floatTag}`}
        animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
      >
        &lt;/&gt;
      </motion.div>
      <motion.div 
        className={`${styles.floatingElement} ${styles.floatBraces}`}
        animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      >
        &#123; &#125;
      </motion.div>

      {/* Main bobbing window */}
      <motion.div
        className={styles.terminalContainer}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className={styles.terminalGlow} />

        {/* Top Window Header */}
        <div className={styles.windowHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
            <span className={styles.windowTitle}>ajith_g@IDE</span>
          </div>
          <div className={styles.headerRight}>
            <Play size={12} className={styles.runIcon} />
            <span className={styles.branchText}> main</span>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className={styles.workspace}>
          {/* Sidebar folder explorer */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarTitle}>EXPLORER</div>
            <div className={styles.folderRow}>
              <Folder size={12} className={styles.folderIcon} />
              <span>src</span>
            </div>
            <div 
              className={`${styles.fileRow} ${activeTab === 'bio' ? styles.activeFileRow : ''}`}
              onClick={() => setActiveTab('bio')}
            >
              <FileCode size={12} style={{ color: '#ffea00' }} />
              <span>bio.js</span>
            </div>
            <div 
              className={`${styles.fileRow} ${activeTab === 'skills' ? styles.activeFileRow : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <FileJson size={12} style={{ color: '#00f5ff' }} />
              <span>skills.json</span>
            </div>
          </div>

          {/* Code Area */}
          <div className={styles.editorPane}>
            {/* Tabs Row */}
            <div className={styles.tabsRow}>
              <div 
                className={`${styles.tab} ${activeTab === 'bio' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('bio')}
              >
                <FileCode size={11} style={{ color: '#ffea00' }} />
                <span>bio.js</span>
              </div>
              <div 
                className={`${styles.tab} ${activeTab === 'skills' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <FileJson size={11} style={{ color: '#00f5ff' }} />
                <span>skills.json</span>
              </div>
            </div>

            {/* Editor Body */}
            <div className={styles.editorBody}>
              {activeTab === 'bio' ? (
                <>
                  <div className={styles.lineNumbers}>
                    {Array.from({ length: 17 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <pre className={styles.codeArea}>
                    <code
                      dangerouslySetInnerHTML={{
                        __html: renderHighlightedCode(displayedCode) + '<span class="' + styles.cursor + '">_</span>'
                      }}
                    />
                  </pre>
                </>
              ) : (
                <>
                  <div className={styles.lineNumbers}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <pre className={styles.codeArea}>
                    <code className={styles.jsonCode}>
                      {`{\n  "developer": {\n    "name": "Ega Ajith G",\n    "frontend": ["React", "Tailwind", "Motion"],\n    "backend":  ["Node", "Express", "REST API"],\n    "database": ["MongoDB", "Mongoose", "SQL"],\n    "devops":   ["Git", "Docker", "Vercel"]\n  }\n}`}
                    </code>
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Console Panel */}
        <div className={styles.consolePanel}>
          <div className={styles.consoleHeader}>
            <div className={styles.consoleHeaderLeft}>
              <Terminal size={12} style={{ color: '#27c93f' }} />
              <span>Terminal - bash</span>
            </div>
            <span className={styles.consoleStatus}>online</span>
          </div>
          <div className={styles.consoleLogs}>
            {/* Render initial logs */}
            {terminalLogs.map((log, idx) => (
              <div key={idx} className={`${styles.logLine} ${styles[log.type]}`}>
                {log.text}
              </div>
            ))}
            
            {/* Render compilation step */}
            {compilerStep === 1 && (
              <div className={styles.logLineWarning}>
                {getProgressBar()}
              </div>
            )}

            {/* Blinking shell cursor at bottom */}
            {compilerStep === 3 && (
              <div className={styles.logLinePrompt}>
                guest@ajith.dev:~$ <span className={styles.pulseCursor}>_</span>
              </div>
            )}
          </div>
        </div>

        {/* VSCode-style Status Bar at very bottom */}
        <div className={styles.statusBar}>
          <div className={styles.statusBarLeft}>
            <div className={styles.statusBarItem} style={{ background: '#00f5ff', color: '#000' }}>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className={styles.statusBarItem}>
              <span>Ln 14, Col 28</span>
            </div>
          </div>
          <div className={styles.statusBarRight}>
            <div className={styles.statusBarItem}>
              <span>UTF-8</span>
            </div>
            <div className={styles.statusBarItem}>
              <span>Spaces: 2</span>
            </div>
            <div className={styles.statusBarItem} style={{ color: '#27c93f' }}>
              <span>✓ Prettier</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroTerminal;
