import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Wrench, Sparkles, Terminal, Activity, Layers, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from './Skills.module.css';

const INITIAL_SKILLS = [
  { name: 'HTML5', level: 95, category: 'frontend', color: '#E34F26', desc: 'Building semantic and accessible web structures.' },
  { name: 'CSS3', level: 90, category: 'frontend', color: '#1572B6', desc: 'Creating responsive and modern user interfaces.' },
  { name: 'JavaScript', level: 90, category: 'frontend', color: '#F7DF1E', desc: 'Developing dynamic and interactive web experiences.' },
  { name: 'React.js', level: 88, category: 'frontend', color: '#61DAFB', desc: 'Building scalable component-based applications.' },
  { name: 'Bootstrap', level: 92, category: 'frontend', color: '#7952B3', desc: 'Rapid development of responsive layouts.' },
  { name: 'Node.js', level: 85, category: 'backend', color: '#339933', desc: 'Developing scalable server-side applications.' },
  { name: 'Express.js', level: 85, category: 'backend', color: '#828282', desc: 'Building RESTful APIs and backend services.' },
  { name: 'MongoDB', level: 82, category: 'backend', color: '#47A248', desc: 'Managing NoSQL databases efficiently.' },
  { name: 'Mongoose', level: 80, category: 'backend', color: '#880000', desc: 'Simplifying MongoDB data modeling.' },
  { name: 'JWT Authentication', level: 85, category: 'backend', color: '#d63aff', desc: 'Implementing secure user authentication.' },
  { name: 'REST API', level: 88, category: 'backend', color: '#00b4d8', desc: 'Designing structured communication between systems.' },
  { name: 'Git', level: 90, category: 'tools', color: '#F05032', desc: 'Version control and collaboration.' },
  { name: 'GitHub', level: 92, category: 'tools', color: '#ffffff', desc: 'Managing repositories and team workflows.' },
  { name: 'VS Code', level: 95, category: 'tools', color: '#007ACC', desc: 'Primary development environment.' },
  { name: 'Figma', level: 75, category: 'tools', color: '#F24E1E', desc: 'UI/UX collaboration and design.' },
  { name: 'Netlify / Vercel', level: 85, category: 'tools', color: '#00F5FF', desc: 'Deployment and hosting platforms.' },
  { name: 'S3 Bucket', level: 80, category: 'others', color: '#FF9900', desc: 'Amazon Simple Storage Service (S3) for cloud object storage.' }
];

const getSkillFallbackDetails = (name) => {
  const key = name.toLowerCase().trim();
  if (key.includes('html')) return { color: '#E34F26', desc: 'Building semantic and accessible web structures.' };
  if (key.includes('css')) return { color: '#1572B6', desc: 'Creating responsive and modern user interfaces.' };
  if (key.includes('javascript') || key === 'js') return { color: '#F7DF1E', desc: 'Developing dynamic and interactive web experiences.' };
  if (key.includes('react')) return { color: '#61DAFB', desc: 'Building scalable component-based applications.' };
  if (key.includes('bootstrap')) return { color: '#7952B3', desc: 'Rapid development of responsive layouts.' };
  if (key.includes('node')) return { color: '#339933', desc: 'Developing scalable server-side applications.' };
  if (key.includes('express')) return { color: '#828282', desc: 'Building RESTful APIs and backend services.' };
  if (key.includes('mongo')) return { color: '#47A248', desc: 'Managing NoSQL databases efficiently.' };
  if (key.includes('mongoose')) return { color: '#880000', desc: 'Simplifying MongoDB data modeling.' };
  if (key.includes('jwt') || key.includes('token') || key.includes('auth')) return { color: '#d63aff', desc: 'Implementing secure user authentication.' };
  if (key.includes('api') || key.includes('rest')) return { color: '#00b4d8', desc: 'Designing structured communication between systems.' };
  if (key.includes('git') && !key.includes('hub')) return { color: '#F05032', desc: 'Version control and collaboration.' };
  if (key.includes('github')) return { color: '#ffffff', desc: 'Managing repositories and team workflows.' };
  if (key.includes('code') || key.includes('vscode')) return { color: '#007ACC', desc: 'Primary development environment.' };
  if (key.includes('figma')) return { color: '#F24E1E', desc: 'UI/UX collaboration and design.' };
  if (key.includes('netlify') || key.includes('vercel')) return { color: '#00F5FF', desc: 'Deployment and hosting platforms.' };
  if (key.includes('s3') || key.includes('bucket') || key.includes('amazon s3')) return { color: '#FF9900', desc: 'Amazon Simple Storage Service (S3) for cloud object storage.' };
  return { color: '#00f5ff', desc: 'Custom competency node.' };
};

const getSVGDetails = (input) => {
  const trimmed = (input || '').trim();
  if (!trimmed) return { d: '', viewBox: null };

  if (trimmed.startsWith('<') || trimmed.includes('svg') || trimmed.includes('path')) {
    let viewBox = null;
    const viewBoxMatch = trimmed.match(/viewBox=["']([^"']+)["']/i);
    if (viewBoxMatch) {
      viewBox = viewBoxMatch[1];
    }

    const dMatches = [...trimmed.matchAll(/d=["']([^"']+)["']/gi)];
    if (dMatches.length > 0) {
      const dValue = dMatches.map(m => m[1]).join(' ');
      return { d: dValue, viewBox };
    }
  }

  return { d: trimmed, viewBox: null };
};

const renderSkillIcon = (name, svgPath) => {
  if (svgPath) {
    const details = getSVGDetails(svgPath);
    const isS3 = name.toLowerCase().includes('s3');
    const viewBox = details.viewBox || (isS3 ? "0 0 256 256" : "0 0 24 24");
    return (
      <svg viewBox={viewBox} style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d={details.d} fill="currentColor" />
      </svg>
    );
  }
  const key = name.toLowerCase().trim();
  if (key.includes('html')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h10.438l.233-2.625H5.875l.698 7.875h7.106l-.23 2.597-2.472.668-2.47-.668-.158-1.782H6.012l.314 3.53 5.651 1.527 5.65-1.527.625-7.042H8.531z" />
      </svg>
    );
  }
  if (key.includes('css')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.09 6.25h10.74l-.232 2.625H9.208l.232 2.625h7.02l-.625 7.042-3.858 1.042-3.856-1.042-.25-2.812h2.612l.125 1.406 1.369.37 1.37-.37.288-3.25H6.83l-.24-2.625h10.74l.232-2.625H6.59l-.02-2.625z" />
      </svg>
    );
  }
  if (key.includes('javascript') || key === 'js') {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.153-.787-.728-1.352-1.713-1.637-.621-.186-1.423-.338-1.986-.532-.676-.231-.83-.492-.83-.812 0-.323.23-.615.8-.812.287-.092.83-.153 1.306-.015.426.123.738.4.846.862h2.523c-.154-1.846-1.321-2.923-3.23-3.215-.785-.123-1.677-.046-2.338.215-1.399.538-2.199 1.492-2.199 2.876 0 1.261.646 2.062 1.846 2.507.8.293 1.8.492 2.476.677.677.185.83.477.83.846 0 .4-.385.738-1.077.738-.723 0-1.169-.307-1.338-.846h-2.583c.123 1.876 1.445 2.938 3.522 3.107.877.062 1.769-.077 2.415-.354 1.445-.6 2.199-1.584 2.199-3.045 0-1.123-.538-1.938-1.785-2.384zm-11.474-4.891h-2.584v7.907c0 1.139-.078 1.954-.369 2.446-.308.538-.83.815-1.538.815-.693 0-1.17-.261-1.462-.784-.308-.554-.385-1.339-.385-2.539H1.614c0 2.215.138 3.6.83 4.568.754 1.047 2.062 1.508 3.738 1.508 1.631 0 2.861-.508 3.615-1.477.723-.97.83-2.354.83-4.63V13.377z" />
      </svg>
    );
  }
  if (key.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (key.includes('bootstrap')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M11.3 2C5.7 2 1.2 6.5 1.2 12s4.5 10 10.1 10h6.1c3.1 0 5.6-2.5 5.6-5.6V12c0-5.5-4.5-10-10.1-10zm-1.8 14.8H7.1V7.2h2.5c1.4 0 2.5.3 3.1.9s1 .15 1 1.2c0 .9-.5 1.5-1.4 1.8.9.3 1.6.9 1.6 1.9 0 1.1-.4 1.9-1.2 2.5-.8.5-1.9.9-3.2.9zm1.8-6.1c0-.6-.3-1-1-1H8.7v2h1.6c.7 0 1-.4 1-1zm.4 3.7c0-.7-.4-1.1-1.1-1.1H8.7v2.2h1.9c.7 0 1.1-.4 1.1-1.1z" />
      </svg>
    );
  }
  if (key.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M12 .397L2.246 6.03v11.27l9.754 5.632 9.754-5.631V6.029L12 .397zm-.45 20.312l-7.755-4.48V7.288l7.755 4.478v8.943zm8.204-4.48l-7.755 4.48v-8.943l7.755-4.478v8.941z" />
      </svg>
    );
  }
  if (key.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <text x="1" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.8">ex</text>
        <circle cx="20" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (key.includes('mongo')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M12 0C10.74 0 9.21 2.94 8.78 5.76c-.66 4.31.81 8.84 3.22 13.56.55 1.08 1 2.05 1.34 2.96.11-.9-.23-1.92-.71-2.96-2.2-4.72-3.47-9.25-2.81-13.56.37-2.45 1.58-4.96 2.18-5.76.6.8 1.81 3.31 2.18 5.76.66 4.31-.61 8.84-2.81 13.56-.48 1.04-.82 2.06-.71 2.96.34-.91.79-1.88 1.34-2.96 2.41-4.72 3.88-9.25 3.22-13.56C14.79 2.94 13.26 0 12 0z" />
      </svg>
    );
  }
  if (key.includes('mongoose')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'none', stroke: 'currentColor' }}>
        <rect x="2" y="2" width="8" height="6" rx="2" strokeWidth="2" />
        <rect x="14" y="14" width="8" height="6" rx="2" strokeWidth="2" />
        <path d="M6 8v6c0 1 1 2 2 2h6" strokeWidth="2" />
        <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (key.includes('jwt') || key.includes('token') || key.includes('auth')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z" />
      </svg>
    );
  }
  if (key.includes('api') || key.includes('rest')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', stroke: 'currentColor' }}>
        <circle cx="5" cy="12" r="3" fill="currentColor" />
        <circle cx="19" cy="5" r="3" fill="currentColor" />
        <circle cx="19" cy="19" r="3" fill="currentColor" />
        <path d="M7.7 10.8l8.6-4.1M7.7 13.2l8.6 4.1" strokeWidth="2" />
      </svg>
    );
  }
  if (key.includes('git') && !key.includes('hub')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M20.6 10.1L13.9 3.4c-.8-.8-2-.8-2.8 0L7.8 6.7l2.5 2.5c.6-.2 1.3-.1 1.9.4.5.5.7 1.2.5 1.9l2.5 2.5c.7-.2 1.4 0 1.9.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.9l-2.5-2.5c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3L6 9.6v5.8c.6.2 1.1.8 1.1 1.5 0 .9-.8 1.7-1.7 1.7s-1.7-.8-1.7-1.7c0-.7.5-1.3 1.1-1.5V8.1c-.6-.2-1.1-.8-1.1-1.5 0-.9.8-1.7 1.7-1.7.7 0 1.3.5 1.5 1.1l3.3-3.3c1.5-1.5 4-1.5 5.5 0l6.7 6.7c1.5 1.5 1.5 4 0 5.5l-2.4 2.4-2.5-2.5 2.4-2.4c.8-.7.8-2 0-2.8z" />
      </svg>
    );
  }
  if (key.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  }
  if (key.includes('code') || key.includes('vscode')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M23.15 2.587L17.51.474a.75.75 0 0 0-.96.39L11.56 12 8.35 9.6a.75.75 0 0 0-1.02.09L.41 16.14a.75.75 0 0 0 .02 1.07l4.7 4.11a.75.75 0 0 0 .99-.04l5.44-4.8 5.6 4.15a.75.75 0 0 0 1.02-.09l5.24-5.38a.75.75 0 0 0 .18-.5V3.08a.75.75 0 0 0-.41-.493zM18 16.5v-9l3.5 4.5L18 16.5z" />
      </svg>
    );
  }
  if (key.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm8 8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z" />
      </svg>
    );
  }
  if (key.includes('netlify') || key.includes('vercel')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="M24 22.525H0L12 1.475l12 21.05z" />
      </svg>
    );
  }
  if (key.includes('s3') || key.includes('bucket') || key.includes('amazon s3')) {
    return (
      <svg viewBox="0 0 256 256" style={{ width: '100%', height: '100%', fill: 'currentColor' }}>
        <path d="m194.675 137.256l1.229-8.652c11.33 6.787 11.478 9.59 11.475 9.667c-.02.016-1.952 1.629-12.704-1.015m-6.218-1.728c-19.584-5.926-46.857-18.438-57.894-23.654c0-.045.013-.086.013-.131c0-4.24-3.45-7.69-7.693-7.69c-4.237 0-7.687 3.45-7.687 7.69s3.45 7.69 7.687 7.69c1.862 0 3.552-.695 4.886-1.8c12.986 6.148 40.048 18.478 59.776 24.302l-7.801 55.059q-.033.225-.032.451c0 4.848-21.463 13.754-56.532 13.754c-35.44 0-57.13-8.906-57.13-13.754q0-.22-.028-.435l-16.3-119.062c14.108 9.712 44.454 14.85 73.478 14.85c28.979 0 59.273-5.12 73.41-14.802zM48 65.528c.23-4.21 24.428-20.73 75.2-20.73c50.764 0 74.966 16.516 75.2 20.73v1.437c-2.784 9.443-34.144 19.434-75.2 19.434c-41.127 0-72.503-10.023-75.2-19.479zm156.8.07c0-11.087-31.79-27.2-81.6-27.2c-49.812 0-81.6 16.113-81.6 27.2l.3 2.414l17.754 129.676c.426 14.503 39.1 19.91 63.526 19.91c30.31 0 62.512-6.969 62.928-19.9l7.668-54.07c4.265 1.02 7.776 1.542 10.595 1.542c3.785 0 6.345-.925 7.897-2.774c1.274-1.517 1.76-3.354 1.396-5.31c-.83-4.428-6.087-9.202-16.794-15.311l7.603-53.639z" />
      </svg>
    );
  }
  return <Sparkles style={{ width: '18px', height: '18px' }} />;
};

const Skills = () => {
  const [dbSkills, setDbSkills] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setDbSkills(data);
        setApiError(false);
      })
      .catch(() => {
        console.log('[SKILLS] Database skills matrix offline. Using static fallbacks.');
        setApiError(true);
      });
  }, []);

  const getSkillsData = () => {
    const source = dbSkills.length > 0 ? dbSkills : INITIAL_SKILLS;
    
    const categoriesMap = {
      'frontend': { category: 'Frontend Development', class: styles.frontendCard, items: [] },
      'backend': { category: 'Backend & Database Development', class: styles.backendCard, items: [] },
      'tools': { category: 'Tools & Technologies', class: styles.toolsCard, items: [] },
      'others': { category: 'Others', class: styles.othersCard, items: [] }
    };

    source.forEach(skill => {
      const catKey = (skill.category || 'others').toLowerCase().trim();
      const targetCategory = categoriesMap[catKey] || categoriesMap['others'];
      
      const fallback = getSkillFallbackDetails(skill.name);
      
      targetCategory.items.push({
        name: skill.name,
        level: skill.level,
        desc: skill.desc || fallback.desc,
        color: skill.color || fallback.color,
        icon: renderSkillIcon(skill.name, skill.svgPath)
      });
    });

    return [
      categoriesMap['frontend'],
      categoriesMap['backend'],
      categoriesMap['tools'],
      categoriesMap['others']
    ];
  };

  const skillsData = getSkillsData();
  const [activeCategory, setActiveCategory] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const getCategoryAverage = (categoryKey, fallbackAverage) => {
    const source = dbSkills.length > 0 ? dbSkills : INITIAL_SKILLS;
    const filtered = source.filter(s => (s.category || '').toLowerCase().trim() === categoryKey);
    if (filtered.length === 0) return fallbackAverage;
    const sum = filtered.reduce((acc, curr) => acc + curr.level, 0);
    return Math.round(sum / filtered.length);
  };

  const categoryAverages = [
    { name: "Frontend", level: getCategoryAverage("frontend", 91), color: "#ff1a1a", icon: Cpu },
    { name: "Backend", level: getCategoryAverage("backend", 84), color: "#ff4d4d", icon: Database },
    { name: "Tooling", level: getCategoryAverage("tools", 88), color: "#ffffff", icon: Wrench }
  ];

  const coreSpecs = [
    {
      title: "React.js Core",
      subtitle: "Client Synapse",
      desc: "Scalable state architectures, virtual DOM reconciliation, custom hooks lifecycle, and fluid interactive UX pathways.",
      color: "#61DAFB"
    },
    {
      title: "Node.js Core",
      subtitle: "Process Thread",
      desc: "Scalable asynchronous routing, API gateways, RESTful endpoints, and secured token middleware pipelines.",
      color: "#339933"
    },
    {
      title: "MongoDB Core",
      subtitle: "Data Node",
      desc: "NoSQL document schemes, high-performance query indexing, aggregation frameworks, and JSON collection structures.",
      color: "#47A248"
    }
  ];

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Technical Skills</span>
          <h2 className="section-title">Skills Center</h2>
          <p className={styles.sectionDescription}>
            Technologies and tools I use to build modern, scalable, and high-performance web applications.
          </p>
        </div>

        {apiError ? (
          <div className={styles.apiOfflineMessage}>
            <AlertTriangle size={32} className={styles.errorIcon} />
            <span className={styles.errorTitle}>[ SYSTEM LINK ERROR: OFFLINE SKILLS TELEMETRY ]</span>
            <p className={styles.errorDescription}>
              Failed to connect to the portfolio API gateway server. Please ensure the backend services are actively running.
            </p>
          </div>
        ) : (
          <div className={styles.bentoGrid}>
            
            {/* Bento Card 1: Interactive Skills Console (Span 2 Cols, 2 Rows) */}
            <div className={`${styles.bentoCard} ${styles.spanTwoCols} ${styles.spanTwoRows}`}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <Terminal size={18} className={styles.accentRed} />
                  <h3 className={styles.bentoCardTitle}>Skills Console</h3>
                </div>
                
                {/* Category Selector Tabs */}
                <div className={styles.tabContainer}>
                  {skillsData.map((categoryGroup, index) => (
                    <button
                      key={index}
                      className={`${styles.tabBtn} ${activeCategory === index ? styles.activeTab : ''}`}
                      onClick={() => setActiveCategory(index)}
                    >
                      {index === 0 ? "Frontend" : index === 1 ? "Backend & DB" : index === 2 ? "Tools" : "Others"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Skills List Grid */}
              <div className={styles.skillsBentoGrid}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    className={styles.skillsActiveWrapper}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {skillsData[activeCategory].items.map((skill, itemIndex) => {
                      const currentLevel = skill.level;
                      return (
                        <motion.div
                          key={skill.name}
                          className={styles.bentoSkillItem}
                          variants={itemVariants}
                          style={{ '--brand-color': skill.color }}
                        >
                          <div className={styles.skillHeaderRow}>
                            <div className={styles.iconWrapper}>
                              {skill.icon}
                            </div>
                            <div className={styles.skillInfo}>
                              <h4 className={styles.skillNameText}>{skill.name}</h4>
                              <p className={styles.skillDescText}>{skill.desc}</p>
                            </div>
                          </div>

                          {/* Custom Radial Circular Gauge */}
                          <div className={styles.circularGaugeContainer}>
                            <div className={styles.gaugeValue}>{currentLevel}%</div>
                            <svg className={styles.circularProgress} viewBox="0 0 36 36">
                              <path
                                className={styles.circleBg}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <motion.path
                                className={styles.circle}
                                strokeDasharray={`${currentLevel}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: currentLevel / 100 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                                style={{ stroke: 'var(--brand-color)' }}
                              />
                            </svg>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bento Card 2: Proficiency Balance Indicators (Span 1 Col, 1 Row) */}
            <div className={styles.bentoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <Activity size={18} className={styles.accentRed} />
                  <h3 className={styles.bentoCardTitle}>Proficiency Balance</h3>
                </div>
              </div>
              
              <div className={styles.balanceList}>
                {categoryAverages.map((cat, idx) => (
                  <div key={idx} className={styles.balanceItem}>
                    <div className={styles.balanceMeta}>
                      <cat.icon size={16} style={{ color: cat.color }} />
                      <span className={styles.balanceName}>{cat.name}</span>
                      <span className={styles.balanceVal}>{cat.level}%</span>
                    </div>
                    <div className={styles.balanceBarTrack}>
                      <motion.div
                        className={styles.balanceBarFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Key Competencies (Span 1 Col, 1 Row) */}
            <div className={styles.bentoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <Sparkles size={18} className={styles.accentRed} />
                  <h3 className={styles.bentoCardTitle}>Competencies</h3>
                </div>
              </div>

              <div className={styles.competencyCloud}>
                {["REST API Design", "JWT Authentication", "Git & Workflows", "Responsive Layouts", "Database Optimization", "UI/UX Prototyping", "Asynchronous Systems", "Clean Coding"].map((tag, idx) => (
                  <div key={idx} className={styles.competencyBadge}>
                    <CheckCircle size={10} className={styles.accentRed} />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 4: Core Specialization Hub (Span 3 Cols, 1 Row) */}
            <div className={`${styles.bentoCard} ${styles.spanThreeCols}`}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <Layers size={18} className={styles.accentRed} />
                  <h3 className={styles.bentoCardTitle}>Core Architecture Specializations</h3>
                </div>
              </div>

              <div className={styles.coreSpecsGrid}>
                {coreSpecs.map((spec, idx) => (
                  <div key={idx} className={styles.coreSpecItem} style={{ '--spec-color': spec.color }}>
                    <div className={spec.color === '#61DAFB' ? styles.specDotCyan : spec.color === '#339933' ? styles.specDotGreen : styles.specDotMongo} />
                    <div className={styles.specMeta}>
                      <span className={styles.specSubtitle}>{spec.subtitle}</span>
                      <h4 className={styles.specTitle}>{spec.title}</h4>
                      <p className={styles.specDesc}>{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
