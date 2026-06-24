import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Mail,
  Briefcase,
  Award,
  Sliders,
  LogOut,
  Server,
  Database,
  Cpu,
  Globe,
  Shield,
  Wifi,
  Terminal,
  RefreshCw,
  Sun,
  Moon,
  Settings,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import styles from './AdminDashboard.module.css';
import { compressBase64Image } from '../../utils/imageCompressor';

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

const renderLivePreviewIcon = (name) => {
  const key = (name || '').toLowerCase().trim();
  if (key.includes('html')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h10.438l.233-2.625H5.875l.698 7.875h7.106l-.23 2.597-2.472.668-2.47-.668-.158-1.782H6.012l.314 3.53 5.651 1.527 5.65-1.527.625-7.042H8.531z" />
      </svg>
    );
  }
  if (key.includes('css')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm5.09 6.25h10.74l-.232 2.625H9.208l.232 2.625h7.02l-.625 7.042-3.858 1.042-3.856-1.042-.25-2.812h2.612l.125 1.406 1.369.37 1.37-.37.288-3.25H6.83l-.24-2.625h10.74l.232-2.625H6.59l-.02-2.625z" />
      </svg>
    );
  }
  if (key.includes('javascript') || key === 'js') {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.153-.787-.728-1.352-1.713-1.637-.621-.186-1.423-.338-1.986-.532-.676-.231-.83-.492-.83-.812 0-.323.23-.615.8-.812.287-.092.83-.153 1.306-.015.426.123.738.4.846.862h2.523c-.154-1.846-1.321-2.923-3.23-3.215-.785-.123-1.677-.046-2.338.215-1.399.538-2.199 1.492-2.199 2.876 0 1.261.646 2.062 1.846 2.507.8.293 1.8.492 2.476.677.677.185.83.477.83.846 0 .4-.385.738-1.077.738-.723 0-1.169-.307-1.338-.846h-2.583c.123 1.876 1.445 2.938 3.522 3.107.877.062 1.769-.077 2.415-.354 1.445-.6 2.199-1.584 2.199-3.045 0-1.123-.538-1.938-1.785-2.384zm-11.474-4.891h-2.584v7.907c0 1.139-.078 1.954-.369 2.446-.308.538-.83.815-1.538.815-.693 0-1.17-.261-1.462-.784-.308-.554-.385-1.339-.385-2.539H1.614c0 2.215.138 3.6.83 4.568.754 1.047 2.062 1.508 3.738 1.508 1.631 0 2.861-.508 3.615-1.477.723-.97.83-2.354.83-4.63V13.377z" />
      </svg>
    );
  }
  if (key.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'currentColor' }}>
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" strokeWidth="1.6" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (key.includes('bootstrap')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M11.3 2C5.7 2 1.2 6.5 1.2 12s4.5 10 10.1 10h6.1c3.1 0 5.6-2.5 5.6-5.6V12c0-5.5-4.5-10-10.1-10zm-1.8 14.8H7.1V7.2h2.5c1.4 0 2.5.3 3.1.9s1 .15 1 1.2c0 .9-.5 1.5-1.4 1.8.9.3 1.6.9 1.6 1.9 0 1.1-.4 1.9-1.2 2.5-.8.5-1.9.9-3.2.9zm1.8-6.1c0-.6-.3-1-1-1H8.7v2h1.6c.7 0 1-.4 1-1zm.4 3.7c0-.7-.4-1.1-1.1-1.1H8.7v2.2h1.9c.7 0 1.1-.4 1.1-1.1z" />
      </svg>
    );
  }
  if (key.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M12 .397L2.246 6.03v11.27l9.754 5.632 9.754-5.631V6.029L12 .397zm-.45 20.312l-7.755-4.48V7.288l7.755 4.478v8.943zm8.204-4.48l-7.755 4.48v-8.943l7.755-4.478v8.941z" />
      </svg>
    );
  }
  if (key.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <text x="1" y="17" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.8">ex</text>
        <circle cx="20" cy="8" r="3" />
      </svg>
    );
  }
  if (key.includes('mongo')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M12 0C10.74 0 9.21 2.94 8.78 5.76c-.66 4.31.81 8.84 3.22 13.56.55 1.08 1 2.05 1.34 2.96.11-.9-.23-1.92-.71-2.96-2.2-4.72-3.47-9.25-2.81-13.56.37-2.45 1.58-4.96 2.18-5.76.6.8 1.81 3.31 2.18 5.76.66 4.31-.61 8.84-2.81 13.56-.48 1.04-.82 2.06-.71 2.96.34-.91.79-1.88 1.34-2.96 2.41-4.72 3.88-9.25 3.22-13.56C14.79 2.94 13.26 0 12 0z" />
      </svg>
    );
  }
  if (key.includes('mongoose')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'currentColor' }}>
        <rect x="2" y="2" width="8" height="6" rx="2" fill="none" strokeWidth="2" />
        <rect x="14" y="14" width="8" height="6" rx="2" fill="none" strokeWidth="2" />
        <path d="M6 8v6c0 1 1 2 2 2h6" fill="none" strokeWidth="2" />
        <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (key.includes('jwt') || key.includes('token') || key.includes('auth')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z" />
      </svg>
    );
  }
  if (key.includes('api') || key.includes('rest')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'currentColor' }}>
        <circle cx="5" cy="12" r="3" fill="currentColor" />
        <circle cx="19" cy="5" r="3" fill="currentColor" />
        <circle cx="19" cy="19" r="3" fill="currentColor" />
        <path d="M7.7 10.8l8.6-4.1M7.7 13.2l8.6 4.1" strokeWidth="2" />
      </svg>
    );
  }
  if (key.includes('git') && !key.includes('hub')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M20.6 10.1L13.9 3.4c-.8-.8-2-.8-2.8 0L7.8 6.7l2.5 2.5c.6-.2 1.3-.1 1.9.4.5.5.7 1.2.5 1.9l2.5 2.5c.7-.2 1.4 0 1.9.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.9l-2.5-2.5c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3L6 9.6v5.8c.6.2 1.1.8 1.1 1.5 0 .9-.8 1.7-1.7 1.7s-1.7-.8-1.7-1.7c0-.7.5-1.3 1.1-1.5V8.1c-.6-.2-1.1-.8-1.1-1.5 0-.9.8-1.7 1.7-1.7.7 0 1.3.5 1.5 1.1l3.3-3.3c1.5-1.5 4-1.5 5.5 0l6.7 6.7c1.5 1.5 1.5 4 0 5.5l-2.4 2.4-2.5-2.5 2.4-2.4c.8-.7.8-2 0-2.8z" />
      </svg>
    );
  }
  if (key.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  }
  if (key.includes('code') || key.includes('vscode')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M23.15 2.587L17.51.474a.75.75 0 0 0-.96.39L11.56 12 8.35 9.6a.75.75 0 0 0-1.02.09L.41 16.14a.75.75 0 0 0 .02 1.07l4.7 4.11a.75.75 0 0 0 .99-.04l5.44-4.8 5.6 4.15a.75.75 0 0 0 1.02-.09l5.24-5.38a.75.75 0 0 0 .18-.5V3.08a.75.75 0 0 0-.41-.493zM18 16.5v-9l3.5 4.5L18 16.5z" />
      </svg>
    );
  }
  if (key.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M8 24a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4v8H8zm8 8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4zm0-8a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z" />
      </svg>
    );
  }
  if (key.includes('netlify') || key.includes('vercel')) {
    return (
      <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="M24 22.525H0L12 1.475l12 21.05z" />
      </svg>
    );
  }
  if (key.includes('s3') || key.includes('bucket') || key.includes('amazon s3')) {
    return (
      <svg viewBox="0 0 256 256" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
        <path d="m194.675 137.256l1.229-8.652c11.33 6.787 11.478 9.59 11.475 9.667c-.02.016-1.952 1.629-12.704-1.015m-6.218-1.728c-19.584-5.926-46.857-18.438-57.894-23.654c0-.045.013-.086.013-.131c0-4.24-3.45-7.69-7.693-7.69c-4.237 0-7.687 3.45-7.687 7.69s3.45 7.69 7.687 7.69c1.862 0 3.552-.695 4.886-1.8c12.986 6.148 40.048 18.478 59.776 24.302l-7.801 55.059q-.033.225-.032.451c0 4.848-21.463 13.754-56.532 13.754c-35.44 0-57.13-8.906-57.13-13.754q0-.22-.028-.435l-16.3-119.062c14.108 9.712 44.454 14.85 73.478 14.85c28.979 0 59.273-5.12 73.41-14.802zM48 65.528c.23-4.21 24.428-20.73 75.2-20.73c50.764 0 74.966 16.516 75.2 20.73v1.437c-2.784 9.443-34.144 19.434-75.2 19.434c-41.127 0-72.503-10.023-75.2-19.479zm156.8.07c0-11.087-31.79-27.2-81.6-27.2c-49.812 0-81.6 16.113-81.6 27.2l.3 2.414l17.754 129.676c.426 14.503 39.1 19.91 63.526 19.91c30.31 0 62.512-6.969 62.928-19.9l7.668-54.07c4.265 1.02 7.776 1.542 10.595 1.542c3.785 0 6.345-.925 7.897-2.774c1.274-1.517 1.76-3.354 1.396-5.31c-.83-4.428-6.087-9.202-16.794-15.311l7.603-53.639z" />
      </svg>
    );
  }
  return <Sparkles size={18} />;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('sys-arch');
  const [theme, setTheme] = useState(() => localStorage.getItem('adminTheme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('adminTheme', newTheme);
  };
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [analytics, setAnalytics] = useState({ views: 0, uniqueVisitors: 0, desktopCount: 0, mobileCount: 0, recentVisits: [] });

  // Dashboard Status Metrics
  const [clientStatus, setClientStatus] = useState(navigator.onLine ? 'ONLINE' : 'OFFLINE');
  const [serverStatus, setServerStatus] = useState('ONLINE');
  const [dbStatus, setDbStatus] = useState('CONNECTED');
  const [latency, setLatency] = useState('12ms');
  const [activeConnections, setActiveConnections] = useState('1 ACTIVE');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    '[SYS] Establishing secure handshake gateway...',
    '[SYS] Express routing gateway online on port 5000.',
    '[DB] MongoDB connection established successfully.',
    '[AUTH] Administrator token verified (ADMIN_AJITH).',
    '[TELEMETRY] Listening on active telemetry streams...'
  ]);

  // Forms State
  const [projectForm, setProjectForm] = useState({
    id: '',
    title: '',
    desc: '',
    category: 'frontend',
    tags: [],
    github: '',
    live: '',
    image: '',
    active: true,
    appType: '',
    workingStatus: '',
    imageAlign: 'top'
  });
  const [tempTag, setTempTag] = useState('');
  const [batchInput, setBatchInput] = useState('');

  const [certForm, setCertForm] = useState({
    id: '',
    title: '',
    issuer: '',
    date: '',
    credId: '',
    image: '',
    link: ''
  });

  const [skillForm, setSkillForm] = useState({
    id: '',
    name: '',
    level: 50,
    category: 'frontend',
    color: '#00f5ff',
    desc: '',
    svgPath: ''
  });

  const [skillAdjustments, setSkillAdjustments] = useState([]);

  // Settings State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [publicMaintenanceMode, setPublicMaintenanceMode] = useState(false);
  const [maintenanceDuration, setMaintenanceDuration] = useState(0);
  const [maintenanceEnd, setMaintenanceEnd] = useState(null);
  const [adminTimeLeft, setAdminTimeLeft] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('preset'); // 'preset' or 'custom'
  const [customLaunchDate, setCustomLaunchDate] = useState('');
  const [pingInterval, setPingInterval] = useState(10000);

  useEffect(() => {
    if (!publicMaintenanceMode || !maintenanceEnd) {
      setAdminTimeLeft('');
      return;
    }

    const interval = setInterval(() => {
      const diff = new Date(maintenanceEnd) - new Date();
      if (diff <= 0) {
        setAdminTimeLeft('Expired');
        setPublicMaintenanceMode(false);
        setMaintenanceEnd(null);
        clearInterval(interval);
      } else {
        const totalSecs = Math.floor(diff / 1000);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        setAdminTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [publicMaintenanceMode, maintenanceEnd]);

  // Live Monitor States
  const [monitorData, setMonitorData] = useState(null);
  const [consoleFilter, setConsoleFilter] = useState('ALL');
  const [consoleSearch, setConsoleSearch] = useState('');
  const [isConsolePaused, setIsConsolePaused] = useState(false);
  const [liveApiRequests, setLiveApiRequests] = useState([
    { method: 'GET', url: '/api/projects', status: 200, latency: '4ms', time: 'Just now' },
    { method: 'GET', url: '/api/skills', status: 200, latency: '8ms', time: '1s ago' },
    { method: 'GET', url: '/api/status', status: 200, latency: '12ms', time: '3s ago' }
  ]);
  const [monitorLogs, setMonitorLogs] = useState([
    { type: 'SYS', message: 'System Diagnostics interface initiated.' },
    { type: 'DB', message: 'MERN MongoDB collections matched successfully.' },
    { type: 'TRAFFIC', message: 'Traffic ledger actively monitoring hits.' }
  ]);
  const [clientSessionUptime, setClientSessionUptime] = useState(0);
  const [expandedErrorIndex, setExpandedErrorIndex] = useState(null);

  // UI state
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const navigate = useNavigate();

  const triggerConfirm = (title, message, onConfirm) => {
    setConfirmModal({
      show: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal({ show: false, title: '', message: '', onConfirm: null });
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin.aji2004/login');
      return;
    }

    // Verify token and fetch all initial dashboard data
    const headers = { 'Authorization': `Bearer ${token}` };

    fetch('/api/auth/verify', { headers })
      .then(res => {
        if (!res.ok) throw new Error('Session expired');
        return res.json();
      })
      .then(() => {
        fetchMessages();
        fetchProjects();
        fetchCertifications();
        fetchSkills();
        fetchAnalytics();
        updateLatency();
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin.aji2004/login');
      });
  }, [navigate]);

  useEffect(() => {
    const handleOnline = () => setClientStatus('ONLINE');
    const handleOffline = () => setClientStatus('OFFLINE');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setClientSessionUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkConnectionStatus = async () => {
    const start = Date.now();
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error();
      const data = await res.json();
      const diff = Date.now() - start;
      setLatency(`${diff}ms`);
      setServerStatus('ONLINE');
      setDbStatus(data.database || 'DISCONNECTED');
      if (data.database === 'CONNECTED') {
        setMaintenanceMode(prev => {
          if (prev) {
            showNotify('System reconnected. Maintenance mode disabled.');
          }
          return false;
        });
      }
      return { server: 'ONLINE', db: data.database || 'DISCONNECTED', latency: `${diff}ms` };
    } catch (err) {
      setServerStatus('OFFLINE');
      setDbStatus('DISCONNECTED');
      setLatency('---');
      return { server: 'OFFLINE', db: 'DISCONNECTED', latency: '---' };
    }
  };

  const updateLatency = async () => {
    setIsRefreshing(true);
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev.slice(-6), `[${timestamp}] [SYS] Dispatching manual gateway ping check...`]);

    // Also fetch fresh visitor analytics
    fetchAnalytics();

    const result = await checkConnectionStatus();
    const timeStr = new Date().toLocaleTimeString();
    if (result.server === 'ONLINE') {
      setConsoleLogs(prev => [...prev.slice(-6), `[${timeStr}] [SYS] Handshake verified. Latency: ${result.latency}. DB: ${result.db}.`]);
    } else {
      setConsoleLogs(prev => [...prev.slice(-6), `[${timeStr}] [ERR] Handshake failed. Server offline.`]);
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    checkConnectionStatus();
    const statusInterval = setInterval(() => {
      checkConnectionStatus();
    }, pingInterval);
    return () => clearInterval(statusInterval);
  }, [pingInterval]);

  useEffect(() => {
    if (activeTab !== 'sys-arch') return;
    const mockEvents = [
      '[SYS] Dispatched routine telemetry probe to route gateway.',
      '[DB] Dynamic buffer matched index references successfully.',
      '[SYS] SSL Handshake validated on port 443.',
      '[DB] Read query dispatched on active project models.',
      '[SYS] Client connection state verified: ACTIVE.',
      '[AUTH] Checked admin session ledger: AUTHORIZED.',
      '[DB] Model document references matched schema constraints.'
    ];

    const timer = setInterval(() => {
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const timestamp = new Date().toLocaleTimeString();
      setConsoleLogs(prev => [...prev.slice(-6), `[${timestamp}] ${randomEvent}`]);
    }, 7000);

    return () => clearInterval(timer);
  }, [activeTab]);

  const showNotify = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // --- API Fetches ---
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCertifications = async () => {
    try {
      const res = await fetch('/api/certifications');
      if (res.ok) {
        const data = await res.json();
        setCertifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
        // Pre-fill skill adjustments state for matrix mod tab
        setSkillAdjustments(data.map(s => ({ id: s._id, name: s.name, level: s.level, category: s.category })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
        setPublicMaintenanceMode(data.maintenanceMode || false);
        setMaintenanceEnd(data.maintenanceEnd || null);
      }
    } catch (err) {
      console.error('[ANALYTICS] Error fetching stats:', err);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        showNotify('Password updated successfully.');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showNotify(data.message || 'Failed to change password.', 'error');
      }
    } catch (err) {
      showNotify('Server connection error.', 'error');
    }
  };

  const clearAnalyticsLedger = async () => {
    try {
      const res = await fetch('/api/analytics/clear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        showNotify('Telemetry analytics ledger cleared.');
        setAnalytics(data.stats || { views: 0, uniqueVisitors: 0, desktopCount: 0, mobileCount: 0, recentVisits: [] });
      } else {
        showNotify('Failed to clear analytics ledger.', 'error');
      }
    } catch (err) {
      showNotify('Server connection error.', 'error');
    }
  };

  const fetchMonitorData = async () => {
    try {
      const res = await fetch('/api/analytics/monitor', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMonitorData(data);

        if (!isConsolePaused) {
          const methods = ['GET', 'POST', 'PUT', 'DELETE'];
          const urls = ['/api/projects', '/api/skills', '/api/messages', '/api/status', '/api/auth/verify', '/api/analytics/monitor'];
          const randMethod = methods[Math.floor(Math.random() * methods.length)];
          const randUrl = urls[Math.floor(Math.random() * urls.length)];
          const randLatency = Math.floor(Math.random() * 25) + 3;

          setLiveApiRequests(prev => [
            { method: randMethod, url: randUrl, status: 200, latency: `${randLatency}ms`, time: 'Just now' },
            ...prev.slice(0, 5)
          ]);

          const sysLogs = [
            `[SYS] CPU core load stabilized.`,
            `[SYS] Node V8 engine heap usage: ${data.server.nodeUsedRamMB}MB`,
            `[SYS] Active telemetry ping executed.`,
            `[DB] Collection sizes synchronized. Data Size: ${data.database.dataSizeKB}KB`,
            `[DB] Read query dispatched on active models.`,
            `[TRAFFIC] Active hits logged. Total Views: ${data.traffic.views}`,
            `[TRAFFIC] Device type distribution updated.`
          ];
          const randLog = sysLogs[Math.floor(Math.random() * sysLogs.length)];
          const logType = randLog.startsWith('[SYS]') ? 'SYS' : randLog.startsWith('[DB]') ? 'DB' : 'TRAFFIC';

          setMonitorLogs(prev => [
            ...prev,
            { type: logType, message: randLog }
          ].slice(-50));
        }
      }
    } catch (err) {
      console.error('[MONITOR] Error fetching system telemetry:', err);
    }
  };

  useEffect(() => {
    if (activeTab !== 'db-monitor') return;
    fetchMonitorData();
    const timer = setInterval(() => {
      fetchMonitorData();
    }, 3000);
    return () => clearInterval(timer);
  }, [activeTab, isConsolePaused]);

  const clearErrorLedger = async () => {
    try {
      const res = await fetch('/api/analytics/monitor/errors', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        showNotify('System incident logs cleared.');
        setExpandedErrorIndex(null);
        fetchMonitorData();
      } else {
        showNotify('Failed to clear system incidents.', 'error');
      }
    } catch (err) {
      showNotify('Server connection error.', 'error');
    }
  };

  const toggleMaintenanceMode = async (enabled) => {
    try {
      let bodyData = { enabled };
      if (enabled) {
        if (maintenanceType === 'custom') {
          if (!customLaunchDate) {
            showNotify('Please select a target launch date & time.', 'error');
            return;
          }
          const targetTime = new Date(customLaunchDate).getTime();
          if (isNaN(targetTime) || targetTime <= Date.now()) {
            showNotify('Launch date & time must be in the future.', 'error');
            return;
          }
          bodyData.maintenanceEnd = new Date(customLaunchDate).toISOString();
        } else {
          bodyData.durationMinutes = maintenanceDuration;
        }
      }
      const res = await fetch('/api/analytics/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(bodyData)
      });
      if (res.ok) {
        const data = await res.json();
        setPublicMaintenanceMode(data.maintenanceMode);
        setMaintenanceEnd(data.maintenanceEnd || null);
        showNotify(`Public Site Maintenance Mode ${data.maintenanceMode ? 'ENABLED' : 'DISABLED'}.`);
      } else {
        showNotify('Failed to update maintenance mode.', 'error');
      }
    } catch (err) {
      showNotify('Server connection error.', 'error');
    }
  };

  // --- Actions ---
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin.aji2004/login');
  };

  // Inbox
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        showNotify('Message marked as read.');
        fetchMessages();
        setSelectedMessage(prev => prev && prev._id === id ? { ...prev, isRead: true } : prev);
      }
    } catch (err) {
      showNotify('Failed to update message.', 'error');
    }
  };

  const deleteMessage = (id) => {
    triggerConfirm(
      'TERMINATE MESSAGE PACKET',
      'Are you sure you want to permanently erase this guest message ledger?',
      async () => {
        try {
          const res = await fetch(`/api/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
          });
          if (res.ok) {
            showNotify('Message packet removed.');
            fetchMessages();
          }
        } catch (err) {
          showNotify('Failed to delete message.', 'error');
        }
      }
    );
  };

  // Projects CRUD
  const selectProjectForEdit = (p) => {
    setProjectForm({
      id: p._id,
      title: p.title,
      desc: p.desc,
      category: p.category,
      tags: p.tags,
      github: p.github,
      live: p.live,
      image: p.image || '',
      active: p.active,
      appType: p.appType || '',
      workingStatus: p.workingStatus || '',
      imageAlign: p.imageAlign || 'top'
    });
  };

  const clearProjectForm = () => {
    setProjectForm({
      id: '',
      title: '',
      desc: '',
      category: 'frontend',
      tags: [],
      github: '',
      live: '',
      image: '',
      active: true,
      appType: '',
      workingStatus: '',
      imageAlign: 'top'
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotify('Payload must be of image media type.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressed = await compressBase64Image(reader.result);
      setProjectForm(prev => ({ ...prev, image: compressed }));
      showNotify('Image cached and compressed in buffer state.');
    };
    reader.readAsDataURL(file);
  };

  const addCustomBadge = () => {
    const val = tempTag.trim();
    if (!val) return;
    if (!projectForm.tags.includes(val)) {
      setProjectForm(prev => ({ ...prev, tags: [...prev.tags, val] }));
    }
    setTempTag('');
  };

  const removeBadge = (idx) => {
    setProjectForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx)
    }));
  };

  const saveProjectRecord = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.desc) {
      showNotify('Project validation exception: Title and Desc required.', 'error');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const isEdit = !!projectForm.id;
    const url = isEdit ? `/api/projects/${projectForm.id}` : '/api/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectForm)
      });

      if (!res.ok) throw new Error('Server returned error status');

      showNotify(isEdit ? 'Project record updated successfully.' : 'Project document published to MongoDB.');
      clearProjectForm();
      fetchProjects();
    } catch (err) {
      showNotify('Failed to publish project document.', 'error');
    }
  };

  const deleteProject = (id) => {
    triggerConfirm(
      'DELETE PROJECT NODE',
      'Are you sure you want to destroy this project record from the telemetry database?',
      async () => {
        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
          });
          if (res.ok) {
            showNotify('Project record deleted.');
            fetchProjects();
            if (projectForm.id === id) clearProjectForm();
          }
        } catch (err) {
          showNotify('Failed to delete project.', 'error');
        }
      }
    );
  };

  const toggleProjectActive = async (p) => {
    try {
      const res = await fetch(`/api/projects/${p._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ active: !p.active })
      });
      if (res.ok) {
        showNotify(`Project is now ${!p.active ? 'ACTIVE' : 'OFFLINE'}.`);
        fetchProjects();
      }
    } catch (err) {
      showNotify('Failed to toggle project state.', 'error');
    }
  };

  const triggerBatchAdd = async () => {
    if (!batchInput.trim()) {
      showNotify('Batch parser payload empty.', 'error');
      return;
    }

    const names = batchInput.split(',').map(n => n.trim()).filter(Boolean);
    const token = localStorage.getItem('adminToken');

    try {
      const promises = names.map(name => {
        return fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: name,
            desc: `Batch generated record for ${name}. Live updates active.`,
            category: 'frontend',
            tags: ['Batch', 'Mock'],
            active: true
          })
        });
      });

      await Promise.all(promises);
      showNotify(`Successfully injected ${names.length} documents.`);
      setBatchInput('');
      fetchProjects();
    } catch (err) {
      showNotify('Failed to complete batch insertion.', 'error');
    }
  };

  const triggerLoadPresets = async () => {
    const presets = [
      { title: "Crypto Ledger Wallet", category: "fullstack", tags: ["Web3", "Solidity", "Tailwind"] },
      { title: "AI Semantic Summarizer", category: "fullstack", tags: ["Next.js", "OpenAI", "Python"] },
      { title: "Cloud Docker Monitor", category: "frontend", tags: ["Go", "Docker", "Prometheus"] }
    ];
    const token = localStorage.getItem('adminToken');

    try {
      const promises = presets.map(p => {
        return fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: p.title,
            desc: `Automated microservice node showcasing deployment monitoring, system resource telemetry, and performance profiles.`,
            category: p.category,
            tags: p.tags,
            active: true
          })
        });
      });

      await Promise.all(promises);
      showNotify('Injected 3 presets into MERN architecture.');
      fetchProjects();
    } catch (err) {
      showNotify('Failed to seed presets.', 'error');
    }
  };

  // Certifications CRUD
  const selectCertForEdit = (c) => {
    setCertForm({
      id: c._id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      credId: c.credId || '',
      image: c.image || '',
      link: c.link || ''
    });
  };

  const clearCertForm = () => {
    setCertForm({
      id: '',
      title: '',
      issuer: '',
      date: '',
      credId: '',
      image: '',
      link: ''
    });
  };

  const handleCertFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotify('Payload must be of image media type.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressed = await compressBase64Image(reader.result);
      setCertForm(prev => ({ ...prev, image: compressed }));
      showNotify('Certification image cached and compressed in buffer state.');
    };
    reader.readAsDataURL(file);
  };

  const saveCertificationRecord = async (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer || !certForm.date) {
      showNotify('Certification validation exception: Title, Issuer, and Date required.', 'error');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const isEdit = !!certForm.id;
    const url = isEdit ? `/api/certifications/${certForm.id}` : '/api/certifications';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(certForm)
      });

      if (!res.ok) throw new Error();

      showNotify(isEdit ? 'Certification record updated successfully.' : 'Credential registered in database ledger.');
      clearCertForm();
      fetchCertifications();
    } catch (err) {
      showNotify('Failed to save credential.', 'error');
    }
  };

  const deleteCertification = (id) => {
    triggerConfirm(
      'ERASE CREDENTIAL DOCUMENT',
      'Are you sure you want to revoke and delete this certification record from the system ledger?',
      async () => {
        try {
          const res = await fetch(`/api/certifications/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
          });
          if (res.ok) {
            showNotify('Certification record removed.');
            fetchCertifications();
            if (certForm.id === id) clearCertForm();
          }
        } catch (err) {
          showNotify('Failed to delete certification.', 'error');
        }
      }
    );
  };

  // Skills console
  const handleSkillSliderChange = (id, level) => {
    setSkillAdjustments(prev =>
      prev.map(s => s.id === id ? { ...s, level: parseInt(level) } : s)
    );
  };

  const saveSkillAdjustments = async () => {
    try {
      const res = await fetch('/api/skills/adjust', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ adjustments: skillAdjustments })
      });

      if (!res.ok) throw new Error();

      showNotify('Skill matrix adjustments saved successfully.');
      fetchSkills();
    } catch (err) {
      showNotify('Failed to save skill modifications.', 'error');
    }
  };

  const selectSkillForEdit = (s) => {
    setSkillForm({
      id: s._id,
      name: s.name,
      level: s.level,
      category: s.category,
      color: s.color || '#00f5ff',
      desc: s.desc || '',
      svgPath: s.svgPath || ''
    });
  };

  const clearSkillForm = () => {
    setSkillForm({
      id: '',
      name: '',
      level: 50,
      category: 'frontend',
      color: '#00f5ff',
      desc: '',
      svgPath: ''
    });
  };

  const saveSkillRecord = async (e) => {
    e.preventDefault();
    if (!skillForm.name || skillForm.level === undefined || !skillForm.category) {
      showNotify('Skill validation exception: Name, Level, and Category required.', 'error');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const isEdit = !!skillForm.id;
    const url = isEdit ? `/api/skills/${skillForm.id}` : '/api/skills';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skillForm)
      });

      if (!res.ok) throw new Error();

      showNotify(isEdit ? 'Skill node updated successfully.' : 'Skill node registered in ledger.');
      clearSkillForm();
      fetchSkills();
    } catch (err) {
      showNotify('Failed to save skill node.', 'error');
    }
  };

  const deleteSkill = (id) => {
    triggerConfirm(
      'DELETE SKILL NODE',
      'Are you sure you want to permanently delete this skill node from the system database?',
      async () => {
        try {
          const res = await fetch(`/api/skills/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
          });
          if (res.ok) {
            showNotify('Skill node deleted.');
            fetchSkills();
            if (skillForm.id === id) clearSkillForm();
          }
        } catch (err) {
          showNotify('Failed to delete skill.', 'error');
        }
      }
    );
  };

  return (
    <section className={`${styles.dashboardSection} ${theme === 'light' ? styles.lightTheme : ''}`}>
      <div className={styles.dashboardLayout}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarBrandContainer}>
              <div className={styles.sidebarBrand}>
                {/* Custom glowing SVG logo */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className={styles.sidebarBrandLogo}>
                  <polygon
                    points="12,2 22,8 22,18 12,24 2,18 2,8"
                    stroke={theme === 'light' ? '#ff1a1a' : '#00f5ff'}
                    strokeWidth="2"
                    fill={theme === 'light' ? 'rgba(255, 26, 26, 0.12)' : 'rgba(0, 245, 255, 0.12)'}
                    style={{ filter: theme === 'light' ? 'drop-shadow(0 0 6px rgba(255, 26, 26, 0.6))' : 'drop-shadow(0 0 6px rgba(0, 245, 255, 0.6))' }}
                  />
                  <polygon
                    points="12,6 18,10 18,16 12,20 6,16 6,10"
                    fill={theme === 'light' ? 'rgba(255, 26, 26, 0.3)' : 'rgba(138, 43, 226, 0.3)'}
                  />
                  <text
                    x="12"
                    y="15.5"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="900"
                    fill="#ffffff"
                    fontFamily="'Orbitron', sans-serif"
                  >
                    A
                  </text>
                </svg>
                <span>EGA AJITH G</span>
              </div>
              <div className={styles.sidebarSubtitle}>
                PORTFOLIO CONTROL PANEL // ONLY ACCESS FOR AJITH
              </div>
            </div>
          </div>

          <nav className={styles.sidebarMenu}>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'sys-arch' ? styles.activeSidebarBtn : ''}`}
              onClick={() => setActiveTab('sys-arch')}
            >
              <Activity size={16} />
              <span>Telemetry</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-inbox' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-inbox'); fetchMessages(); }}
            >
              <Mail size={16} />
              <span>Inbox ({messages.filter(m => !m.isRead).length})</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-projects' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-projects'); fetchProjects(); }}
            >
              <Briefcase size={16} />
              <span>Projects</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-certs' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-certs'); fetchCertifications(); }}
            >
              <Award size={16} />
              <span>Certifications</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-skills' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-skills'); fetchSkills(); }}
            >
              <Sliders size={16} />
              <span>Skills Matrix</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-monitor' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-monitor'); fetchMonitorData(); }}
            >
              <Cpu size={16} />
              <span>Live Monitor</span>
            </button>
            <button
              className={`${styles.sidebarBtn} ${activeTab === 'db-settings' ? styles.activeSidebarBtn : ''}`}
              onClick={() => { setActiveTab('db-settings'); }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </nav>

          <div className={styles.sidebarFooter}>
            <button
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'NEON BLUE' : 'CYBER RED'} Mode`}
              type="button"
            >
              {theme === 'light' ? <Sun size={14} style={{ color: '#00f5ff' }} /> : <Sun size={14} style={{ color: '#ff1a1a' }} />}
              <span>{theme === 'light' ? 'NEON BLUE' : 'CYBER RED'}</span>
            </button>
            <button className={styles.terminateBtn} onClick={handleLogout}>
              <LogOut size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              TERMINATE SESSION
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.contentArea}>
          {/* Status Bar */}
          <div className={styles.statusBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <div className={styles.statusIndicator}>
                <div
                  className={styles.statusPulse}
                  style={{
                    backgroundColor: clientStatus === 'ONLINE' ? '#10b981' : '#ef4444',
                    boxShadow: clientStatus === 'ONLINE' ? '0 0 10px #10b981' : '0 0 10px #ef4444'
                  }}
                />
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: theme === 'light' ? '#475569' : '#8e8ea8' }}>CLIENT: </span>
                <span style={{ color: clientStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontWeight: '800', fontSize: '0.72rem' }}>{clientStatus}</span>
              </div>

              <div style={{ width: '1px', height: '14px', backgroundColor: theme === 'light' ? '#cbd5e1' : 'rgba(255,255,255,0.15)' }} />

              <div className={styles.statusIndicator}>
                <div
                  className={styles.statusPulse}
                  style={{
                    backgroundColor: serverStatus === 'ONLINE' ? '#10b981' : '#ef4444',
                    boxShadow: serverStatus === 'ONLINE' ? '0 0 10px #10b981' : '0 0 10px #ef4444'
                  }}
                />
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: theme === 'light' ? '#475569' : '#8e8ea8' }}>SERVER: </span>
                <span style={{ color: serverStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontWeight: '800', fontSize: '0.72rem' }}>{serverStatus}</span>
              </div>

              <div style={{ width: '1px', height: '14px', backgroundColor: theme === 'light' ? '#cbd5e1' : 'rgba(255,255,255,0.15)' }} />

              <div className={styles.statusIndicator}>
                <div
                  className={styles.statusPulse}
                  style={{
                    backgroundColor: dbStatus === 'CONNECTED' ? '#10b981' : '#ef4444',
                    boxShadow: dbStatus === 'CONNECTED' ? '0 0 10px #10b981' : '0 0 10px #ef4444'
                  }}
                />
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: theme === 'light' ? '#475569' : '#8e8ea8' }}>DATABASE: </span>
                <span style={{ color: dbStatus === 'CONNECTED' ? '#10b981' : '#ef4444', fontWeight: '800', fontSize: '0.72rem' }}>
                  {dbStatus === 'CONNECTED' ? 'CONNECTED' : 'OFFLINE'}
                </span>
              </div>
            </div>
            <div className={styles.statusBarDetails}>
              <span>LATENCY: {latency} // USER: ADMIN_AJITH</span>
            </div>
          </div>

          {/* Tab 1: System Telemetry */}
          {activeTab === 'sys-arch' && (
            <div className={styles.panelCard}>
              <div className={styles.telemetryHeader}>
                <div>
                  <h2 className={styles.sectionTitle} style={{ marginBottom: '5px' }}>Telemetry & Database Control</h2>
                  <p className={styles.paragraph} style={{ marginBottom: '0' }}>
                    Overview of the telemetry status of the port API gateways, Node Express server, and database connection.
                  </p>
                </div>
                <button
                  className={styles.refreshBtn}
                  onClick={updateLatency}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={14} className={isRefreshing ? styles.refreshIconSpin : ''} />
                  <span>{isRefreshing ? 'PINGING...' : 'RUN PING TEST'}</span>
                </button>
              </div>

              {/* DB Core Stats boxes at Top */}
              <div className={styles.statsHeaderRow}>
                <div
                  className={`${styles.statCardHeader} ${styles.statCardHeaderInbox}`}
                  onClick={() => { setActiveTab('db-inbox'); fetchMessages(); }}
                >
                  <div className={styles.statCardHeaderIcon}>
                    <Mail size={20} style={{ color: theme === 'light' ? '#dc2626' : '#ff4d8d' }} />
                  </div>
                  <div>
                    <div className={styles.statCardHeaderValue} style={{ color: theme === 'light' ? '#dc2626' : '#ff4d8d' }}>
                      {messages.length}
                    </div>
                    <div className={styles.statCardHeaderLabel}>Inbox Msgs</div>
                  </div>
                </div>

                <div
                  className={`${styles.statCardHeader} ${styles.statCardHeaderProjects}`}
                  onClick={() => { setActiveTab('db-projects'); fetchProjects(); }}
                >
                  <div className={styles.statCardHeaderIcon}>
                    <Briefcase size={20} style={{ color: theme === 'light' ? '#0284c7' : '#00f5ff' }} />
                  </div>
                  <div>
                    <div className={styles.statCardHeaderValue} style={{ color: theme === 'light' ? '#0284c7' : '#00f5ff' }}>
                      {projects.length}
                    </div>
                    <div className={styles.statCardHeaderLabel}>Projects</div>
                  </div>
                </div>

                <div
                  className={`${styles.statCardHeader} ${styles.statCardHeaderCerts}`}
                  onClick={() => { setActiveTab('db-certs'); fetchCertifications(); }}
                >
                  <div className={styles.statCardHeaderIcon}>
                    <Award size={20} style={{ color: theme === 'light' ? '#7c3aed' : '#bd5cfa' }} />
                  </div>
                  <div>
                    <div className={styles.statCardHeaderValue} style={{ color: theme === 'light' ? '#7c3aed' : '#bd5cfa' }}>
                      {certifications.length}
                    </div>
                    <div className={styles.statCardHeaderLabel}>Certs</div>
                  </div>
                </div>

                <div
                  className={`${styles.statCardHeader} ${styles.statCardHeaderSkills}`}
                  onClick={() => { setActiveTab('db-skills'); fetchSkills(); }}
                >
                  <div className={styles.statCardHeaderIcon}>
                    <Sliders size={20} style={{ color: theme === 'light' ? '#10b981' : '#10b981' }} />
                  </div>
                  <div>
                    <div className={styles.statCardHeaderValue} style={{ color: theme === 'light' ? '#10b981' : '#10b981' }}>
                      {skills.length}
                    </div>
                    <div className={styles.statCardHeaderLabel}>Skills</div>
                  </div>
                </div>
              </div>

              <div className={styles.telemetryGrid}>
                {/* Gateway Telemetry Panel */}
                <div className={styles.telemetryPanel}>
                  <span className={`${styles.panelTag} ${serverStatus === 'ONLINE' ? styles.tagGreen : styles.tagPink}`}>
                    {serverStatus}
                  </span>
                  <div className={styles.panelTitleContainer}>
                    <div className={styles.panelTitleIcon}>
                      <Server size={16} style={{ color: '#00f5ff' }} />
                    </div>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Gateway Telemetry</h3>
                  </div>
                  <div className={styles.consoleBox}>
                    <div className={styles.telemetryRow}>
                      <span className={styles.telemetryRowLabel}>
                        <Globe size={13} style={{ color: '#00f5ff', opacity: 0.8 }} />
                        <span>SERVER IP:</span>
                      </span>
                      <span className={styles.telemetryValue}>127.0.0.1</span>
                    </div>
                    <div className={styles.telemetryRow}>
                      <span className={styles.telemetryRowLabel}>
                        <Activity size={13} style={{ color: '#00f5ff', opacity: 0.8 }} />
                        <span>PING LATENCY:</span>
                      </span>
                      <span className={styles.telemetryValue} style={{ color: '#00f5ff' }}>{latency}</span>
                    </div>
                    <div className={styles.telemetryRow}>
                      <span className={styles.telemetryRowLabel}>
                        <Shield size={13} style={{ color: '#27c93f', opacity: 0.8 }} />
                        <span>SSL SECURITY:</span>
                      </span>
                      <span className={styles.telemetryValue} style={{ color: '#27c93f' }}>SECURE</span>
                    </div>
                    <div className={styles.telemetryRow} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                      <span className={styles.telemetryRowLabel}>
                        <Wifi size={13} style={{ color: '#ff4d8d', opacity: 0.8 }} />
                        <span>CONNECTIONS:</span>
                      </span>
                      <span className={styles.telemetryValue} style={{ color: '#ff4d8d' }}>{activeConnections}</span>
                    </div>
                  </div>
                </div>

                {/* System Handshake Ledger Panel (Stand-alone Card) */}
                <div className={styles.telemetryPanel}>
                  <span
                    className={`${styles.panelTag} ${clientStatus === 'ONLINE' && serverStatus === 'ONLINE' && dbStatus === 'CONNECTED' ? styles.tagGreen : styles.tagPink}`}
                  >
                    {clientStatus === 'ONLINE' && serverStatus === 'ONLINE' && dbStatus === 'CONNECTED' ? 'SECURED' : 'CHECK STATUS'}
                  </span>
                  <div className={styles.panelTitleContainer}>
                    <div className={styles.panelTitleIcon}>
                      <Activity size={16} style={{ color: '#10b981' }} />
                    </div>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>System Handshakes</h3>
                  </div>
                  <div className={styles.consoleBox}>
                    <div style={{ fontSize: '0.72rem', color: theme === 'light' ? '#475569' : '#8e8ea8', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase' }}>
                      System Handshake Ledger:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Client Status */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.7rem', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 'bold' }}>CLIENT NODE</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={styles.statusPulse} style={{ width: '6px', height: '6px', backgroundColor: clientStatus === 'ONLINE' ? '#10b981' : '#ef4444', animationDuration: '1s', borderRadius: '50%', display: 'inline-block' }} />
                          <span style={{ color: clientStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontSize: '0.65rem', fontWeight: 'bold' }}>{clientStatus}</span>
                        </div>
                      </div>

                      {/* Server Status */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.7rem', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 'bold' }}>GATEWAY SERVER</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={styles.statusPulse} style={{ width: '6px', height: '6px', backgroundColor: serverStatus === 'ONLINE' ? '#10b981' : '#ef4444', animationDuration: '1.2s', borderRadius: '50%', display: 'inline-block' }} />
                          <span style={{ color: serverStatus === 'ONLINE' ? '#10b981' : '#ef4444', fontSize: '0.65rem', fontWeight: 'bold' }}>{serverStatus}</span>
                        </div>
                      </div>

                      {/* DB Status */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.7rem', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 'bold' }}>DATABASE INSTANCE</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={styles.statusPulse} style={{ width: '6px', height: '6px', backgroundColor: dbStatus === 'CONNECTED' ? '#10b981' : '#ef4444', animationDuration: '1.4s', borderRadius: '50%', display: 'inline-block' }} />
                          <span style={{ color: dbStatus === 'CONNECTED' ? '#10b981' : '#ef4444', fontSize: '0.65rem', fontWeight: 'bold' }}>
                            {dbStatus === 'CONNECTED' ? 'CONNECTED' : 'OFFLINE'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Core Panel */}
                <div className={`${styles.telemetryPanel} ${styles.telemetryPanelDb}`}>
                  <span className={`${styles.panelTag} ${dbStatus === 'CONNECTED' ? styles.tagGreen : styles.tagPink}`}>
                    {dbStatus}
                  </span>
                  <div className={styles.panelTitleContainer}>
                    <div className={styles.panelTitleIcon}>
                      <Database size={16} style={{ color: '#bd5cfa' }} />
                    </div>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Database Core</h3>
                  </div>
                  <div className={styles.consoleBox} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ fontSize: '0.8rem', color: theme === 'light' ? '#475569' : '#8e8ea8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      MongoDB Server Status Ledger:
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: theme === 'light' ? 'rgba(124, 58, 237, 0.04)' : 'rgba(189, 92, 250, 0.05)',
                      border: theme === 'light' ? '1px solid rgba(124, 58, 237, 0.15)' : '1px solid rgba(189, 92, 250, 0.15)',
                      borderRadius: '6px',
                      padding: '12px'
                    }}>
                      <span className={styles.statusPulse} style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                      <span style={{ color: theme === 'light' ? '#7c3aed' : '#bd5cfa', fontSize: '0.72rem', fontWeight: 'bold' }}>CONNECTED TO MONGODB INSTANCE DYNAMICALLY</span>
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: theme === 'light' ? '#475569' : '#8e8ea8',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      borderTop: '1px dashed rgba(255,255,255,0.06)',
                      paddingTop: '12px'
                    }}>
                      <span>DATABASE CLUSTER: Portfolio_DB</span>
                      <span>COLLECTIONS LOADED: messages, projects, certifications, skills</span>
                    </div>
                  </div>
                </div>

                {/* Visitor Analytics Panel */}
                <div className={`${styles.telemetryPanel} ${styles.telemetryPanelWide}`}>
                  <span className={styles.panelTag} style={{ background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                    Live Traffic
                  </span>
                  <div className={styles.panelTitleContainer}>
                    <div className={styles.panelTitleIcon}>
                      <Activity size={16} style={{ color: '#00f5ff' }} />
                    </div>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Traffic Analytics</h3>
                  </div>
                  <div className={styles.consoleBox} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme === 'light' ? '#dc2626' : '#ff4d8d' }}>{analytics.views}</div>
                        <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Total Views</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00f5ff' }}>{analytics.uniqueVisitors}</div>
                        <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Unique Visitors</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>{analytics.desktopCount || 0}</div>
                        <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Desktop Hits</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#eab308' }}>{analytics.mobileCount || 0}</div>
                        <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Mobile Hits</div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                      <div style={{ fontSize: '0.72rem', color: theme === 'light' ? '#475569' : '#8e8ea8', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>Recent Visits Ledger:</div>
                      <div style={{ maxHeight: '115px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
                        {analytics.recentVisits && analytics.recentVisits.map((v, i) => {
                          const dateStr = new Date(v.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date(v.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

                          let browser = 'Browser';
                          if (v.userAgent.includes('Chrome')) browser = 'Chrome';
                          else if (v.userAgent.includes('Firefox')) browser = 'Firefox';
                          else if (v.userAgent.includes('Safari') && !v.userAgent.includes('Chrome')) browser = 'Safari';
                          else if (v.userAgent.includes('Edge')) browser = 'Edge';

                          let device = 'Desktop';
                          if (v.userAgent.includes('Mobi') || v.userAgent.includes('Android')) device = 'Mobile';

                          return (
                            <div key={i} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.65rem',
                              color: theme === 'light' ? '#475569' : '#8e8ea8',
                              background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)',
                              border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)',
                              borderRadius: '4px',
                              padding: '6px 8px',
                              justifyContent: 'space-between'
                            }}>
                              <span style={{
                                color: theme === 'light' ? '#0f172a' : '#ffffff',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                minWidth: '95px',
                                flexShrink: 0
                              }}>
                                {v.ip === '::1' || v.ip === '127.0.0.1' || v.ip.includes('::ffff:127.0.0.1') ? 'Localhost' : v.ip.length > 15 ? v.ip.substring(0, 12) + '...' : v.ip}
                              </span>
                              <span style={{
                                color: theme === 'light' ? '#0284c7' : '#00f5ff',
                                fontWeight: 'bold',
                                flex: '1',
                                textAlign: 'left',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }} title={`${browser} (${device})`}>
                                {browser} ({device})
                              </span>
                              <span style={{
                                fontSize: '0.6rem',
                                color: theme === 'light' ? '#64748b' : '#8e8ea8',
                                flexShrink: 0,
                                textAlign: 'right'
                              }}>
                                {dateStr}
                              </span>
                            </div>
                          );
                        })}
                        {(!analytics.recentVisits || analytics.recentVisits.length === 0) && (
                          <div style={{ textAlign: 'center', color: '#8e8ea8', fontSize: '0.65rem', padding: '10px' }}>[ NO RECENT VISITS RECORDED ]</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminal Logs Panel */}
                <div className={`${styles.telemetryPanel} ${styles.telemetryPanelTerm}`}>
                  <span className={styles.panelTag} style={{ background: 'rgba(255, 77, 141, 0.15)', border: '1px solid #ff4d8d', color: '#ff4d8d' }}>
                    ACTIVE STREAM
                  </span>
                  <div className={styles.panelTitleContainer}>
                    <div className={styles.panelTitleIcon}>
                      <Terminal size={16} style={{ color: '#ff4d8d' }} />
                    </div>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Console Streams</h3>
                  </div>

                  <div className={styles.consoleBox} style={{ borderColor: 'rgba(255, 77, 141, 0.25)', background: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className={styles.terminalHeader}>
                      <span>SECURE SHELL TELEMETRY LOGS</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <span className={styles.terminalHeaderBtn} style={{ background: '#ff5f56' }} />
                        <span className={styles.terminalHeaderBtn} style={{ background: '#ffbd2e' }} />
                        <span className={styles.terminalHeaderBtn} style={{ background: '#27c93f' }} />
                      </div>
                    </div>
                    <div className={styles.terminalBody}>
                      {consoleLogs.map((log, idx) => (
                        <div key={idx} style={{ color: log.includes('[ERR]') ? '#ff3b7e' : log.includes('[SYS]') ? '#38bdf8' : log.includes('[DB]') ? '#c18fff' : '#8e8ea8' }}>
                          {log}
                        </div>
                      ))}
                    </div>
                    <div className={styles.terminalPromptRow}>
                      <span>{`guest@ajith.dev:~$`}</span>
                      <span style={{ color: '#ffffff', marginLeft: '5px' }}>telemetry --watch</span>
                      <span className={styles.cursorBlink} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Message Inbox */}
          {activeTab === 'db-inbox' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>Guest Connections Console</h2>
              <p className={styles.paragraph} style={{ marginBottom: '20px' }}>
                All incoming communication packets submitted via the Contact form console:
              </p>

              <div className={styles.inboxLayout}>
                {/* Left pane: Message list */}
                <div className={styles.inboxSidebar}>
                  {messages.length === 0 ? (
                    <div className={styles.emptyInbox}>
                      [ NO INCOMING MESSAGES FOUND IN TELEMETRY ]
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m._id}
                        className={`${styles.inboxItem} ${selectedMessage?._id === m._id ? styles.inboxItemSelected : ''} ${!m.isRead ? styles.inboxItemUnread : ''}`}
                        onClick={() => {
                          setSelectedMessage(m);
                          if (!m.isRead) {
                            markAsRead(m._id);
                          }
                        }}
                      >
                        <div className={styles.inboxItemMeta}>
                          <span className={styles.inboxSender}>{m.name}</span>
                          <span className={styles.inboxTime}>
                            {new Date(m.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className={styles.inboxEmail}>{m.email}</div>
                        <div className={styles.inboxSnippet}>
                          {m.message.length > 55 ? m.message.substring(0, 55) + '...' : m.message}
                        </div>
                        {!m.isRead && <span className={styles.unreadDot} />}
                      </div>
                    ))
                  )}
                </div>

                {/* Right pane: Message details */}
                <div className={styles.inboxDetails}>
                  {selectedMessage ? (
                    <div className={styles.messageViewer}>
                      <div className={styles.viewerHeader}>
                        <div className={styles.viewerSenderInfo}>
                          <h3 className={styles.viewerName}>{selectedMessage.name}</h3>
                          <div className={styles.viewerEmailPhone}>
                            <span className={styles.viewerEmail}>{selectedMessage.email}</span>
                            {selectedMessage.phone && (
                              <>
                                <span className={styles.separator}>|</span>
                                <span className={styles.viewerPhone}>{selectedMessage.phone}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className={styles.viewerTime}>
                          {new Date(selectedMessage.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      </div>

                      <div className={styles.viewerBody}>
                        {selectedMessage.message}
                      </div>

                      <div className={styles.viewerActions}>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            deleteMessage(selectedMessage._id);
                            setSelectedMessage(null);
                          }}
                        >
                          Erase Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.noMessageSelected}>
                      <Mail size={36} className={styles.noMessageIcon} />
                      <p>Select an incoming message packet from the registry list to decrypt and view details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Projects Ledger */}
          {activeTab === 'db-projects' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>Projects Console Ledger</h2>
              <p className={styles.paragraph} style={{ marginBottom: '20px' }}>
                Edit existing portfolio project nodes or publish new projects directly to the database:
              </p>

              <div className={styles.projectsLayout}>
                {/* Top Section: Active Projects Grid */}
                <div className={styles.projectsGridSection}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Active Projects</h3>
                    <span className={`${styles.panelTag} ${styles.tagViolet}`}>
                      Records: {projects.length}
                    </span>
                  </div>

                  <div className={styles.activeProjectsGrid}>
                    {projects.map((p) => (
                      <div
                        key={p._id}
                        className={`${styles.projectGridItem} ${projectForm.id === p._id ? styles.projectGridItemSelected : ''}`}
                        onClick={() => selectProjectForEdit(p)}
                      >
                        <div className={styles.projectGridItemHeader}>
                          <div className={styles.projectGridTitle}>{p.title}</div>
                          <div className={styles.statusSwitchContainer} onClick={(e) => { e.stopPropagation(); toggleProjectActive(p); }}>
                            <div className={`${styles.statusSwitch} ${p.active ? styles.statusSwitchActive : ''}`}>
                              <div className={styles.knob}></div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.projectGridMeta}>
                          <span className={styles.projectGridCategory}>{p.category.toUpperCase()}</span>
                          <span style={{ color: p.active ? '#27c93f' : '#8e8ea8', fontSize: '0.65rem', fontWeight: 'bold' }}>
                            {p.active ? 'ACTIVE' : 'OFFLINE'}
                          </span>
                        </div>

                        <div className={styles.projectGridActions}>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnEdit}`} onClick={(e) => { e.stopPropagation(); selectProjectForEdit(p); }}>EDIT</button>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnDel}`} onClick={(e) => { e.stopPropagation(); deleteProject(p._id); }}>DEL</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Form and Preview */}
                <div className={styles.projectsFormAndPreview}>
                  {/* Left: Project Data Form & Batch utilities */}
                  <div className={styles.projectsFormPane}>
                    <div className={styles.telemetryPanel} style={{ padding: '25px', position: 'relative' }}>
                      <span className={styles.panelTag} style={{ background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                        {projectForm.id ? 'Action: Edit' : 'Action: Create'}
                      </span>
                      <h3 className={styles.panelTitle}>Project Data Form</h3>

                      <form onSubmit={saveProjectRecord} className={styles.formBox} style={{ marginTop: '15px' }}>
                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Project Title</label>
                            <input
                              type="text"
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              placeholder="Cyber-Stream App"
                              className={styles.formInput}
                              required
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Category</label>
                            <select
                              value={projectForm.category}
                              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                              className={styles.formInput}
                            >
                              <option value="frontend">Frontend Project</option>
                              <option value="fullstack">Fullstack Project</option>
                              <option value="mobile">Mobile App</option>
                              <option value="devops">DevOps Tool</option>
                            </select>
                          </div>
                        </div>

                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Application Type</label>
                            <input
                              type="text"
                              value={projectForm.appType || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, appType: e.target.value })}
                              placeholder="e.g. E-Commerce Web Application"
                              className={styles.formInput}
                            />
                          </div>
                        </div>

                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Working Status Badge</label>
                            <select
                              value={projectForm.workingStatus || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, workingStatus: e.target.value })}
                              className={styles.formInput}
                            >
                              <option value="">None (No Status Badge)</option>
                              <option value="Live Project">Live Project</option>
                              <option value="Current Project">Current Project</option>
                              <option value="Finished Project">Finished Project</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className={styles.formLabel}>Description</label>
                          <textarea
                            value={projectForm.desc}
                            onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                            placeholder="A responsive streaming platform interface..."
                            className={`${styles.formInput} ${styles.formTextarea}`}
                            required
                          />
                        </div>

                        <div>
                          <label className={styles.formLabel}>Project Mockup Image</label>
                          <div className={styles.dropzone} onClick={() => document.getElementById('project-file-uploader').click()}>
                            <input
                              type="file"
                              id="project-file-uploader"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleFileUpload}
                            />
                            {projectForm.image ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={projectForm.image} alt="Upload thumb" className={styles.uploadThumbnail} />
                                <div style={{ textAlign: 'left' }}>
                                  <div style={{ fontSize: '0.7rem', color: '#ffffff', fontWeight: 'bold', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mockup Loaded</div>
                                  <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>[ BUFFER READY ]</span>
                                </div>
                              </div>
                            ) : (
                              <div style={{ fontSize: '0.75rem', color: '#8e8ea8' }}>
                                Drag & drop or <span style={{ color: '#00f5ff', textDecoration: 'underline' }}>browse image</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>GitHub URL</label>
                            <input
                              type="text"
                              value={projectForm.github}
                              onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                              placeholder="https://github.com/..."
                              className={styles.formInput}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Live Demo URL</label>
                            <input
                              type="text"
                              value={projectForm.live}
                              onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                              placeholder="https://..."
                              className={styles.formInput}
                            />
                          </div>
                        </div>

                        {/* Badges / Tech Tags */}
                        <div>
                          <label className={styles.formLabel}>Technology Badges</label>
                          <div className={styles.badgesContainer}>
                            {projectForm.tags.map((tag, idx) => (
                              <span key={idx} className={styles.badgeItem}>
                                {tag}
                                <span className={styles.removeBadgeBtn} onClick={() => removeBadge(idx)}>&times;</span>
                              </span>
                            ))}
                            {projectForm.tags.length === 0 && <span style={{ fontSize: '0.7rem', color: '#8e8ea8' }}>No tags added yet.</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              value={tempTag}
                              onChange={(e) => setTempTag(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomBadge(); } }}
                              placeholder="Add technology (e.g. React, Docker)"
                              className={styles.formInput}
                              style={{ fontSize: '0.75rem' }}
                            />
                            <button type="button" className={styles.ctrlBtn} style={{ color: '#ffffff' }} onClick={addCustomBadge}>+ADD</button>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button
                            type="submit"
                            className={styles.ctrlBtn}
                            style={{ flex: 2, background: 'rgba(0, 245, 255, 0.08)', borderColor: '#00f5ff', color: '#00f5ff', fontWeight: 'bold' }}
                          >
                            {projectForm.id ? 'UPDATE DOCUMENT' : 'PUBLISH DOCUMENT'}
                          </button>
                          <button
                            type="button"
                            className={styles.ctrlBtn}
                            onClick={clearProjectForm}
                            style={{ flex: 1 }}
                          >
                            CLEAR
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Batch Add Projects */}
                    <div className={styles.telemetryPanel} style={{ padding: '20px', marginTop: '20px' }}>
                      <div style={{ color: '#00f5ff', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Batch Add Projects</div>
                      <textarea
                        value={batchInput}
                        onChange={(e) => setBatchInput(e.target.value)}
                        placeholder="Enter comma-separated project names (e.g. Chat Node, Wallet UI, Cloud App)"
                        className={styles.formInput}
                        style={{ minHeight: '45px', resize: 'none', fontSize: '0.7rem', marginBottom: '8px' }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className={styles.ctrlBtn} style={{ color: '#00f5ff', borderColor: '#00f5ff', flex: 1 }} onClick={triggerBatchAdd}>BATCH ADD</button>
                        <button className={styles.ctrlBtn} style={{ color: '#ff4d8d', borderColor: '#ff4d8d', flex: 1 }} onClick={triggerLoadPresets}>LOAD PRESETS</button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Preview */}
                  <div className={styles.projectsPreviewPane}>
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <span className={styles.panelTag} style={{ background: 'rgba(39, 201, 63, 0.15)', borderColor: '#27c93f', color: '#27c93f' }}>
                        Live UI Render
                      </span>
                      <h3 className={styles.panelTitle}>Card preview</h3>

                      <div
                        className={styles.previewCardContainer}
                        style={{
                          border: `1.5px solid ${projectForm.active ? '#00f5ff' : 'rgba(255,255,255,0.06)'}`,
                          boxShadow: projectForm.active ? '0 0 15px rgba(0, 245, 255, 0.15)' : 'none',
                          marginTop: '20px'
                        }}
                      >
                         <div className={styles.previewImageHeader} style={{ backgroundImage: projectForm.image ? `url(${projectForm.image})` : 'none' }}>
                          <div
                            className={styles.previewActiveBadge}
                            style={{
                              borderColor: projectForm.active ? '#00f5ff' : 'rgba(255,255,255,0.2)',
                              color: projectForm.active ? '#00f5ff' : '#8e8ea8'
                            }}
                          >
                            <div className={styles.previewActiveDot} style={{ background: projectForm.active ? '#27c93f' : '#8e8ea8' }}></div>
                            <span>{projectForm.active ? 'ACTIVE' : 'OFFLINE'}</span>
                          </div>
                          {projectForm.workingStatus && (
                            <span className={`${styles.previewStatusBadge} ${styles.previewImageStatusBadge} ${
                              projectForm.workingStatus === 'Live Project' ? styles.previewStatusLive :
                              projectForm.workingStatus === 'Current Project' ? styles.previewStatusCurrent :
                              styles.previewStatusFinished
                            }`}>
                              {projectForm.workingStatus}
                            </span>
                          )}
                          {!projectForm.image && (
                            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                              [ {projectForm.title ? projectForm.title.toLowerCase().replace(/\s+/g, '-') : 'untitled'}.webp ]
                            </div>
                          )}
                        </div>

                        <div className={styles.previewCardDetails}>
                          <div className={styles.previewTitleRow}>
                            <h4 className={styles.previewTitle}>
                              {projectForm.title || 'Untitled Project'}
                              {projectForm.appType && <span className={styles.appTypeBadge}>{projectForm.appType}</span>}
                            </h4>
                            <span className={styles.previewCategory}>{projectForm.category.toUpperCase()}</span>
                          </div>
                          <p className={styles.previewDescription}>
                            {projectForm.desc || 'Provide a project description in the register form to fill this preview container.'}
                          </p>
                          <div className={styles.previewBadges}>
                            {projectForm.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className={styles.previewBadgeSpan}
                                style={{
                                  color: tag.toLowerCase() === 'react' ? '#00f5ff' : '#ff4d8d',
                                  border: `1px solid ${tag.toLowerCase() === 'react' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255, 77, 141, 0.2)'}`,
                                  background: tag.toLowerCase() === 'react' ? 'rgba(0, 245, 255, 0.05)' : 'rgba(255, 77, 141, 0.05)'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            {projectForm.tags.length === 0 && <span style={{ fontSize: '0.65rem', color: '#8e8ea8' }}>None</span>}
                          </div>
                          <div className={styles.previewActionRow}>
                            <span style={{ color: '#00f5ff', cursor: 'pointer' }}>GITHUB &rarr;</span>
                            <span style={{ color: '#ff4d8d', cursor: 'pointer' }}>LIVE DEMO &rarr;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Certifications */}
          {activeTab === 'db-certs' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>Certifications Registrar</h2>
              <p className={styles.paragraph} style={{ marginBottom: '20px' }}>
                Register, edit, or delete credentials and certifications dynamically in the database ledger:
              </p>

              <div className={styles.projectsLayout}>
                {/* Top Section: Active Credentials Grid */}
                <div className={styles.projectsGridSection}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Active Credentials</h3>
                    <span className={`${styles.panelTag}`} style={{ background: 'rgba(39, 201, 63, 0.15)', borderColor: '#27c93f', color: '#27c93f' }}>
                      Stored: {certifications.length}
                    </span>
                  </div>

                  <div className={styles.activeProjectsGrid}>
                    {certifications.map((c) => (
                      <div
                        key={c._id}
                        className={`${styles.projectGridItem} ${certForm.id === c._id ? styles.projectGridItemSelected : ''}`}
                        onClick={() => selectCertForEdit(c)}
                      >
                        <div className={styles.projectGridItemHeader}>
                          <div className={styles.projectGridTitle}>{c.title}</div>
                        </div>

                        <div className={styles.projectGridMeta}>
                          <span className={styles.projectGridCategory} style={{ color: theme === 'light' ? '#dc2626' : '#ff4d8d' }}>
                            ISSUER: {c.issuer.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>
                            DATE: {c.date}
                          </span>
                        </div>

                        <div className={styles.projectGridActions}>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnEdit}`} onClick={(e) => { e.stopPropagation(); selectCertForEdit(c); }}>EDIT</button>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnDel}`} onClick={(e) => { e.stopPropagation(); deleteCertification(c._id); }}>DEL</button>
                        </div>
                      </div>
                    ))}
                    {certifications.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#8e8ea8', fontFamily: 'Fira Code, monospace', fontSize: '0.75rem', gridColumn: '1 / -1' }}>
                        [ NO CERTIFICATIONS RETRIEVED ]
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Form and Preview */}
                <div className={styles.projectsFormAndPreview}>
                  {/* Left: Credential Form */}
                  <div className={styles.projectsFormPane}>
                    <div className={styles.telemetryPanel} style={{ padding: '20px' }}>
                      <span className={styles.panelTag} style={{ background: 'rgba(255, 77, 141, 0.15)', borderColor: '#ff4d8d', color: '#ff4d8d' }}>
                        {certForm.id ? 'Action: Edit' : 'Action: Create'}
                      </span>
                      <h3 className={styles.panelTitle}>Credential Form</h3>

                      <form onSubmit={saveCertificationRecord} className={styles.formBox} style={{ marginTop: '15px' }}>
                        <div>
                          <label className={styles.formLabel}>Certification Title</label>
                          <input
                            type="text"
                            value={certForm.title}
                            onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                            placeholder="e.g. AWS Certified Developer"
                            className={styles.formInput}
                            required
                          />
                        </div>

                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Issuer Organization</label>
                            <input
                              type="text"
                              value={certForm.issuer}
                              onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                              placeholder="Amazon Web Services"
                              className={styles.formInput}
                              required
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Issue Date</label>
                            <input
                              type="text"
                              value={certForm.date}
                              onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                              placeholder="Jan 2025"
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className={styles.formLabel}>Credential Image Mockup</label>
                          <div className={styles.dropzone} onClick={() => document.getElementById('cert-file-uploader').click()}>
                            <input
                              type="file"
                              id="cert-file-uploader"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleCertFileUpload}
                            />
                            {certForm.image ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={certForm.image} alt="Upload thumb" className={styles.uploadThumbnail} />
                                <div style={{ textAlign: 'left' }}>
                                  <div style={{ fontSize: '0.7rem', color: '#ffffff', fontWeight: 'bold', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mockup Loaded</div>
                                  <span style={{ fontSize: '0.65rem', color: '#27c93f' }}>[ BUFFER READY ]</span>
                                </div>
                              </div>
                            ) : (
                              <div style={{ fontSize: '0.75rem', color: '#8e8ea8' }}>
                                Drag & drop or <span style={{ color: '#ff4d8d', textDecoration: 'underline' }}>browse image</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={styles.formRow}>
                          <div style={{ flex: 1 }}>
                            <label className={styles.formLabel}>Credential ID</label>
                            <input
                              type="text"
                              value={certForm.credId}
                              onChange={(e) => setCertForm({ ...certForm, credId: e.target.value })}
                              placeholder="AWS-DEC-84920"
                              className={styles.formInput}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={styles.formLabel}>Verification Link</label>
                          <input
                            type="text"
                            value={certForm.link}
                            onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                            placeholder="https://drive.google.com/..."
                            className={styles.formInput}
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                          <button
                            type="submit"
                            className={styles.ctrlBtn}
                            style={{ flex: 2, background: 'rgba(255, 77, 141, 0.08)', borderColor: '#ff4d8d', color: '#ff4d8d', fontWeight: 'bold' }}
                          >
                            {certForm.id ? 'UPDATE CREDENTIAL' : 'REGISTER CREDENTIAL'}
                          </button>
                          <button
                            type="button"
                            className={styles.ctrlBtn}
                            onClick={clearCertForm}
                            style={{ flex: 1 }}
                          >
                            CLEAR
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right: Certification Preview */}
                  <div className={styles.projectsPreviewPane}>
                    <div className={styles.telemetryPanel} style={{ padding: '20px' }}>
                      <span className={styles.panelTag} style={{ background: 'rgba(39, 201, 63, 0.15)', borderColor: '#27c93f', color: '#27c93f' }}>
                        Live UI Render
                      </span>
                      <h3 className={styles.panelTitle}>Certificate preview</h3>

                      <div
                        className={styles.previewCardContainer}
                        style={{
                          border: '1.5px solid #ff4d8d',
                          boxShadow: '0 0 15px rgba(255, 77, 141, 0.15)',
                          marginTop: '20px'
                        }}
                      >
                        <div className={styles.previewImageHeader} style={{ backgroundImage: certForm.image ? `url(${certForm.image})` : 'none', height: '160px' }}>
                          {!certForm.image && (
                            <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Fira Code, monospace', fontSize: '0.75rem' }}>
                              [ credential-mockup.webp ]
                            </div>
                          )}
                        </div>

                        <div className={styles.previewCardDetails} style={{ gap: '6px' }}>
                          <div className={styles.previewTitleRow}>
                            <h4 className={styles.previewTitle} style={{ color: '#ffffff', fontSize: '0.85rem' }}>{certForm.title || 'Untitled Certificate'}</h4>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#ff4d8d', fontWeight: 'bold' }}>
                            Issuer: {certForm.issuer || 'Credential Authority'}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#8e8ea8' }}>
                            Issued: {certForm.date || 'Jan 2026'}
                          </div>
                          {certForm.credId && (
                            <div style={{ fontSize: '0.65rem', color: '#00f5ff', fontFamily: 'Fira Code, monospace' }}>
                              ID: {certForm.credId}
                            </div>
                          )}
                          <div className={styles.previewActionRow} style={{ marginTop: '10px' }}>
                            <span style={{ color: '#00f5ff', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Verification Link &rarr;
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Skills Console */}
          {activeTab === 'db-skills' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>Skill Matrix Modifiers</h2>
              <p className={styles.paragraph}>
                Manage technical competency nodes, add new skills, or adjust proficiency levels dynamically:
              </p>

              <div className={styles.skillsTopGrid}>
                {/* Col 1: Parametric Matrix Controls */}
                <div className={styles.telemetryPanel} style={{ padding: '20px' }}>
                  <span className={styles.panelTag} style={{ background: 'rgba(138, 43, 226, 0.15)', borderColor: '#8a2be2', color: '#c18fff' }}>
                    Live Levels
                  </span>
                  <h3 className={styles.panelTitle}>Matrix Slider Controls</h3>

                  <div className={styles.skillSliderGroup} style={{ marginTop: '15px', maxHeight: '420px', overflowY: 'auto', paddingRight: '5px' }}>
                    {skillAdjustments.map((s) => (
                      <div key={s.id} className={styles.skillSliderItem} style={{ marginBottom: '10px' }}>
                        <div className={styles.sliderMeta}>
                          <span className={styles.sliderLabel} style={{ fontSize: '0.75rem' }}>{s.name}</span>
                          <span className={styles.sliderPercent} style={{ fontSize: '0.75rem', color: s.category === 'frontend' ? '#00f5ff' : s.category === 'backend' ? '#ff4d8d' : '#c18fff' }}>
                            {s.level}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={s.level}
                          onChange={(e) => handleSkillSliderChange(s.id, e.target.value)}
                          className={styles.rangeInput}
                          style={{ accentColor: s.category === 'frontend' ? '#00f5ff' : s.category === 'backend' ? '#ff4d8d' : '#8a2be2' }}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={saveSkillAdjustments}
                    className={styles.ctrlBtn}
                    style={{ background: 'rgba(138, 43, 226, 0.08)', borderColor: '#8a2be2', color: '#c18fff', fontWeight: 'bold', padding: '12px', width: '100%', fontSize: '0.75rem', letterSpacing: '1px', marginTop: '15px' }}
                  >
                    SAVE MATRIX LEVELS
                  </button>
                </div>

                {/* Col 2: Active Skills Ledger with Edit/Delete */}
                <div className={styles.telemetryPanel} style={{ padding: '20px' }}>
                  <span className={styles.panelTag} style={{ background: 'rgba(39, 201, 63, 0.15)', borderColor: '#27c93f', color: '#27c93f' }}>
                    Nodes: {skills.length}
                  </span>
                  <h3 className={styles.panelTitle}>Active Skills Ledger</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto', marginTop: '15px', paddingRight: '5px' }}>
                    {skills.map((s) => (
                      <div key={s._id} style={{ border: '1px solid rgba(255, 255, 255, 0.05)', padding: '12px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.8rem' }}>{s.name}</div>
                            <div style={{ fontSize: '0.65rem', color: s.category === 'frontend' ? '#00f5ff' : s.category === 'backend' ? '#ff4d8d' : '#c18fff', marginTop: '2px', textTransform: 'uppercase' }}>
                              {s.category} | {s.level}%
                            </div>
                          </div>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: s.color || '#00f5ff', boxShadow: `0 0 8px ${s.color || '#00f5ff'}` }}></span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnEdit}`} onClick={() => selectSkillForEdit(s)}>EDIT</button>
                          <button className={`${styles.ctrlBtn} ${styles.ctrlBtnDel}`} onClick={() => deleteSkill(s._id)}>DEL</button>
                        </div>
                      </div>
                    ))}
                    {skills.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#8e8ea8', fontFamily: 'Fira Code, monospace', fontSize: '0.75rem' }}>
                        [ NO SKILL NODES DEFINED ]
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.skillsFormAndPreview}>
                {/* Bottom Col 1: Skill Register Form */}
                <div className={styles.skillsFormPane}>
                  <div className={styles.telemetryPanel} style={{ padding: '25px', position: 'relative' }}>
                    <span className={styles.panelTag} style={{ background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                      {skillForm.id ? 'Action: Edit' : 'Action: Create'}
                    </span>
                    <h3 className={styles.panelTitle}>Skill Data Form</h3>

                    <form onSubmit={saveSkillRecord} className={styles.formBox} style={{ marginTop: '15px' }}>
                      <div>
                        <label className={styles.formLabel}>Technology Name</label>
                        <input
                          type="text"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          placeholder="e.g. Next.js, GraphQL"
                          className={styles.formInput}
                          required
                        />
                      </div>

                      <div className={styles.formRow}>
                        <div style={{ flex: 1 }}>
                          <label className={styles.formLabel}>Category</label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                            className={styles.formInput}
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="tools">Tools</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className={styles.formLabel}>Color Accent</label>
                          <input
                            type="text"
                            value={skillForm.color}
                            onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                            placeholder="#00f5ff"
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <div style={{ flex: 1 }}>
                          <label className={styles.formLabel}>Initial Level (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skillForm.level}
                            onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) || 0 })}
                            className={styles.formInput}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className={styles.formLabel}>SVG Path Data (d attribute - Optional)</label>
                        <textarea
                          value={skillForm.svgPath}
                          onChange={(e) => setSkillForm({ ...skillForm, svgPath: e.target.value })}
                          placeholder="e.g. M12 2C6.48 2... (SVG path 'd' value)"
                          className={`${styles.formInput} ${styles.formTextarea}`}
                          style={{ minHeight: '50px' }}
                        />
                      </div>

                      <div>
                        <label className={styles.formLabel}>Description (Optional)</label>
                        <textarea
                          value={skillForm.desc}
                          onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })}
                          placeholder="Explain proficiency or use case..."
                          className={`${styles.formInput} ${styles.formTextarea}`}
                          style={{ minHeight: '60px' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button
                          type="submit"
                          className={styles.ctrlBtn}
                          style={{ flex: 2, background: 'rgba(0, 245, 255, 0.08)', borderColor: '#00f5ff', color: '#00f5ff', fontWeight: 'bold' }}
                        >
                          {skillForm.id ? 'UPDATE NODE' : 'PUBLISH NODE'}
                        </button>
                        <button
                          type="button"
                          className={styles.ctrlBtn}
                          onClick={clearSkillForm}
                          style={{ flex: 1 }}
                        >
                          CLEAR
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Bottom Col 2: Live Skill Card Preview */}
                <div className={styles.skillsPreviewPane}>
                  <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                    <span className={styles.panelTag} style={{ background: 'rgba(39, 201, 63, 0.15)', borderColor: '#27c93f', color: '#27c93f' }}>
                      Live UI Render
                    </span>
                    <h3 className={styles.panelTitle}>Live Card Preview</h3>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div
                        className={styles.previewSkillItem}
                        style={{ '--brand-color': skillForm.color || '#00f5ff', width: '100%' }}
                      >
                        <div className={styles.skillHeaderRow}>
                          <div className={styles.iconWrapper} style={{ color: skillForm.color || '#00f5ff' }}>
                            {skillForm.svgPath ? (
                              (() => {
                                const details = getSVGDetails(skillForm.svgPath);
                                const viewBox = details.viewBox || ((skillForm.name || '').toLowerCase().includes('s3') ? "0 0 256 256" : "0 0 24 24");
                                return (
                                  <svg viewBox={viewBox} style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                                    <path d={details.d} fill="currentColor" />
                                  </svg>
                                );
                              })()
                            ) : (
                              renderLivePreviewIcon(skillForm.name)
                            )}
                          </div>
                          <div className={styles.skillInfo}>
                            <h4 className={styles.skillNameText}>{skillForm.name || 'Technology Name'}</h4>
                            <p className={styles.skillDescText}>{skillForm.desc || 'Explain proficiency or use case...'}</p>
                          </div>
                        </div>

                        <div className={styles.circularGaugeContainer}>
                          <div className={styles.gaugeValue}>{skillForm.level}%</div>
                          <svg className={styles.circularProgress} viewBox="0 0 36 36">
                            <path
                              className={styles.circleBg}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className={styles.circle}
                              strokeDasharray={`${skillForm.level}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              style={{ stroke: skillForm.color || '#00f5ff' }}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Settings Console */}
          {activeTab === 'db-settings' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>System Settings</h2>
              <p className={styles.paragraph} style={{ marginBottom: '25px' }}>
                Manage account credentials, configure dashboard utilities, and execute server database maintenance:
              </p>

              <div className={styles.ledgerGrid}>
                {/* Col 1: Security Configuration */}
                <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                  <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Change Decryption Password</h3>
                    <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(255, 77, 141, 0.15)', borderColor: '#ff4d8d', color: '#ff4d8d' }}>
                      Security Gate
                    </span>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                      showNotify('New passwords do not match.', 'error');
                      return;
                    }
                    changePassword(passwordForm.currentPassword, passwordForm.newPassword);
                  }} className={styles.formBox}>
                    <div>
                      <label className={styles.formLabel}>Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="••••••••••••••"
                        className={styles.formInput}
                        required
                      />
                    </div>
                    <div>
                      <label className={styles.formLabel}>New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="••••••••••••••"
                        className={styles.formInput}
                        required
                      />
                    </div>
                    <div>
                      <label className={styles.formLabel}>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="••••••••••••••"
                        className={styles.formInput}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className={styles.ctrlBtn}
                      style={{ background: 'rgba(255, 77, 141, 0.08)', borderColor: '#ff4d8d', color: '#ff4d8d', fontWeight: 'bold', width: '100%', padding: '12px', marginTop: '10px' }}
                    >
                      UPDATE DECRYPTION KEY
                    </button>
                  </form>
                </div>

                {/* Col 2: System Utilities */}
                <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                  <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Dashboard Maintenance</h3>
                    <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                      System Utils
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    {/* Maintenance toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>Simulation Mode</div>
                        <div style={{ fontSize: '0.65rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', marginTop: '2px' }}>Simulate offline status gates</div>
                      </div>
                      <div
                        className={styles.statusSwitchContainer}
                        onClick={() => {
                          const nextVal = !maintenanceMode;
                          setMaintenanceMode(nextVal);
                          showNotify(`Simulated offline gates ${nextVal ? 'ENABLED' : 'DISABLED'}.`);
                          if (nextVal) {
                            setServerStatus('OFFLINE');
                            setDbStatus('DISCONNECTED');
                          } else {
                            setServerStatus('ONLINE');
                            setDbStatus('CONNECTED');
                          }
                        }}
                      >
                        <div className={`${styles.statusSwitch} ${maintenanceMode ? styles.statusSwitchActive : ''}`}>
                          <div className={styles.knob}></div>
                        </div>
                      </div>
                    </div>

                    {/* Telemetry ping rate option */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>Telemetry Ping Rate</div>
                        <div style={{ fontSize: '0.65rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', marginTop: '2px' }}>Interval for active status updates</div>
                      </div>
                      <select
                        value={pingInterval}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setPingInterval(val);
                          showNotify(`Ping rate set to ${val / 1000} seconds.`);
                        }}
                        className={styles.formInput}
                        style={{ width: '120px', padding: '6px 10px', fontSize: '0.75rem', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <option value={5000}>5 Seconds</option>
                        <option value={10000}>10 Seconds</option>
                        <option value={30000}>30 Seconds</option>
                        <option value={60000}>1 Minute</option>
                      </select>
                    </div>

                    {/* Reset Analytics Button */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>Reset Traffic Ledger</div>
                        <div style={{ fontSize: '0.65rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', marginTop: '2px' }}>Wipe views, uniques, and device counters permanently</div>
                      </div>
                      <button
                        type="button"
                        className={`${styles.ctrlBtn} ${styles.ctrlBtnDel}`}
                        onClick={() => {
                          triggerConfirm(
                            'WIPE ANALYTICS DATA',
                            'Are you sure you want to permanently clear all traffic views, unique visits, and recent visitor logs? This cannot be undone.',
                            clearAnalyticsLedger
                          );
                        }}
                        style={{ width: '100%', padding: '10px', fontSize: '0.7rem', marginTop: '5px' }}
                      >
                        RESET TELEMETRY DATA
                      </button>
                    </div>
                  </div>
                </div>

                {/* Col 3: Public Site Maintenance */}
                <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                  <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 className={styles.panelTitle} style={{ margin: 0 }}>Public Maintenance</h3>
                    <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(255, 77, 141, 0.15)', borderColor: '#ff4d8d', color: '#ff4d8d' }}>
                      Live Status
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.01)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>Public Site Offline</div>
                        <div style={{ fontSize: '0.65rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', marginTop: '2px' }}>Take visitor site offline for updates</div>
                      </div>
                      <div
                        className={styles.statusSwitchContainer}
                        onClick={() => toggleMaintenanceMode(!publicMaintenanceMode)}
                      >
                        <div className={`${styles.statusSwitch} ${publicMaintenanceMode ? styles.statusSwitchActive : ''}`}>
                          <div className={styles.knob}></div>
                        </div>
                      </div>
                    </div>

                    {publicMaintenanceMode && maintenanceEnd && adminTimeLeft && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 77, 141, 0.08)',
                        border: '1px solid rgba(255, 77, 141, 0.3)',
                        borderRadius: '8px',
                        padding: '12px',
                        textAlign: 'center',
                        fontFamily: 'monospace'
                      }}>
                        <div style={{ fontSize: '0.6rem', color: '#ff4d8d', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          REMAINING OFFLINE TIME
                        </div>
                        <div style={{ fontSize: '1.4rem', color: '#ff4d8d', fontWeight: 'bold', marginTop: '4px', textShadow: '0 0 10px rgba(255, 77, 141, 0.4)' }}>
                          {adminTimeLeft}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: publicMaintenanceMode ? 0.6 : 1, pointerEvents: publicMaintenanceMode ? 'none' : 'auto' }}>
                      <div>
                        <label className={styles.formLabel} style={{ fontSize: '0.65rem', marginBottom: '6px' }}>OFFLINE PROTOCOL TYPE</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => setMaintenanceType('preset')}
                            style={{
                              flex: 1,
                              padding: '8px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              border: maintenanceType === 'preset' ? (theme === 'light' ? '1.5px solid #dc2626' : '1.5px solid #00f5ff') : '1px solid rgba(255,255,255,0.08)',
                              background: maintenanceType === 'preset' ? (theme === 'light' ? 'rgba(220, 38, 38, 0.05)' : 'rgba(0, 245, 255, 0.05)') : 'transparent',
                              color: maintenanceType === 'preset' ? (theme === 'light' ? '#dc2626' : '#00f5ff') : (theme === 'light' ? '#64748b' : '#8e8ea8'),
                              transition: 'all 0.2s ease'
                            }}
                          >
                            PRESET DURATION
                          </button>
                          <button
                            type="button"
                            onClick={() => setMaintenanceType('custom')}
                            style={{
                              flex: 1,
                              padding: '8px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              border: maintenanceType === 'custom' ? (theme === 'light' ? '1.5px solid #dc2626' : '1.5px solid #00f5ff') : '1px solid rgba(255,255,255,0.08)',
                              background: maintenanceType === 'custom' ? (theme === 'light' ? 'rgba(220, 38, 38, 0.05)' : 'rgba(0, 245, 255, 0.05)') : 'transparent',
                              color: maintenanceType === 'custom' ? (theme === 'light' ? '#dc2626' : '#00f5ff') : (theme === 'light' ? '#64748b' : '#8e8ea8'),
                              transition: 'all 0.2s ease'
                            }}
                          >
                            CUSTOM DATE & TIME
                          </button>
                        </div>
                      </div>

                      {maintenanceType === 'preset' ? (
                        <div>
                          <label className={styles.formLabel} style={{ fontSize: '0.65rem', marginBottom: '6px' }}>MAINTENANCE DURATION</label>
                          <select
                            value={maintenanceDuration}
                            onChange={(e) => setMaintenanceDuration(Number(e.target.value))}
                            className={styles.formInput}
                            style={{ fontSize: '0.75rem', height: '38px' }}
                          >
                            <option value={0}>Manual / Indefinite</option>
                            <option value={5}>5 Minutes</option>
                            <option value={15}>15 Minutes</option>
                            <option value={30}>30 Minutes</option>
                            <option value={60}>1 Hour</option>
                            <option value={120}>2 Hours</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className={styles.formLabel} style={{ fontSize: '0.65rem', marginBottom: '6px' }}>TARGET LAUNCH DATE & TIME</label>
                          <input
                            type="datetime-local"
                            value={customLaunchDate}
                            onChange={(e) => setCustomLaunchDate(e.target.value)}
                            className={styles.formInput}
                            style={{
                              fontSize: '0.75rem',
                              height: '38px',
                              colorScheme: theme === 'light' ? 'light' : 'dark'
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ fontSize: '0.7rem', color: theme === 'light' ? '#475569' : '#8e8ea8', lineHeight: '1.5', background: theme === 'light' ? '#f8fafc' : 'rgba(0,0,0,0.1)', padding: '12px', borderRadius: '6px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.03)' }}>
                      <strong>Active State Protocol:</strong> Enabling this flag immediately diverts all landing page visitor traffic to a futuristic HUD stand-by screen while maintaining database connections and permitting administrator edits.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Live System Monitoring Dashboard */}
          {activeTab === 'db-monitor' && (
            <div className={styles.panelCard}>
              <h2 className={styles.sectionTitle}>Live System Monitor</h2>
              <p className={styles.paragraph} style={{ marginBottom: '25px' }}>
                Futuristic real-time diagnostics, server resource specifications, database health metrics, and active request streams:
              </p>

              {monitorData ? (
                <>
                  {/* Row 1: Server and Database Performance Metrics Grid */}
                  <div className={styles.monitorGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>

                    {/* Col 1: Server Resource Usage & Details */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <h3 className={styles.panelTitle} style={{ margin: 0 }}>Server Resources</h3>
                        <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                          OS: {monitorData.server.platform.toUpperCase()}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '20px', margin: '20px 0' }}>
                        {/* CPU usage dial */}
                        <div style={{ textAlign: 'center', position: 'relative' }}>
                          <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke={theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)'} strokeWidth="8" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#00f5ff"
                              strokeWidth="8"
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={2 * Math.PI * 40 * (1 - monitorData.server.cpuUsagePct / 100)}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 0.8s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                            />
                            <text x="50" y="55" textAnchor="middle" fill={theme === 'light' ? '#0f172a' : '#ffffff'} fontSize="14" fontWeight="bold" fontFamily="monospace">
                              {monitorData.server.cpuUsagePct}%
                            </text>
                          </svg>
                          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: theme === 'light' ? '#475569' : '#8e8ea8', marginTop: '5px', textTransform: 'uppercase' }}>CPU LOAD</div>
                        </div>

                        {/* RAM usage dial */}
                        <div style={{ textAlign: 'center', position: 'relative' }}>
                          <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke={theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)'} strokeWidth="8" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#ff4d8d"
                              strokeWidth="8"
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={2 * Math.PI * 40 * (1 - monitorData.server.ramUsagePct / 100)}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 0.8s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                            />
                            <text x="50" y="55" textAnchor="middle" fill={theme === 'light' ? '#0f172a' : '#ffffff'} fontSize="14" fontWeight="bold" fontFamily="monospace">
                              {monitorData.server.ramUsagePct}%
                            </text>
                          </svg>
                          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: theme === 'light' ? '#475569' : '#8e8ea8', marginTop: '5px', textTransform: 'uppercase' }}>RAM ALLOC</div>
                        </div>
                      </div>

                      <div className={styles.consoleBox} style={{ fontSize: '0.75rem', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>CPU Type:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={monitorData.server.cpuModel}>{monitorData.server.cpuModel}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>OS Architecture:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.server.arch.toUpperCase()} ({monitorData.server.platform.toUpperCase()})</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>System Memory:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.server.usedRamGB} GB / {monitorData.server.totalRamGB} GB</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Node.js RAM Usage:</span>
                          <span style={{ fontWeight: 'bold', color: '#ff4d8d' }}>{monitorData.server.nodeUsedRamMB} MB</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Server Uptime:</span>
                          <span style={{ fontWeight: 'bold', color: '#27c93f' }}>
                            {Math.floor(monitorData.server.uptimeSeconds / 3600)}h {Math.floor((monitorData.server.uptimeSeconds % 3600) / 60)}m {monitorData.server.uptimeSeconds % 60}s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Database Performance Diagnostics */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <h3 className={styles.panelTitle} style={{ margin: 0 }}>Database Health</h3>
                        <span className={`${styles.panelTag} ${monitorData.database.state === 'CONNECTED' ? styles.tagGreen : styles.tagPink}`} style={{ position: 'static' }}>
                          {monitorData.database.state}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '20px 0' }}>
                        <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#bd5cfa' }}>{monitorData.database.dataSizeKB} KB</div>
                          <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Data Storage</div>
                        </div>
                        <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00f5ff' }}>{monitorData.database.collections}</div>
                          <div style={{ fontSize: '0.62rem', color: theme === 'light' ? '#64748b' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>Active Collections</div>
                        </div>
                      </div>

                      <div className={styles.consoleBox} style={{ fontSize: '0.75rem', gap: '8px' }}>
                        <div style={{ fontSize: '0.7rem', color: theme === 'light' ? '#475569' : '#8e8ea8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>MERN Collections Count:</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Projects Stored:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.database.counts.projects} docs</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Guest Messages:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.database.counts.messages} docs</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Certifications Registered:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.database.counts.certifications} docs</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Skills Matrix Nodes:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.database.counts.skills} docs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Live Requests Monitor and Full Interactive Log terminal */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '25px', alignItems: 'start' }}>

                    {/* Live Endpoint API Request Stream */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <h3 className={styles.panelTitle} style={{ margin: 0 }}>API Traffic Monitor</h3>
                        <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(255, 77, 141, 0.15)', borderColor: '#ff4d8d', color: '#ff4d8d' }}>
                          Active Gateway
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                        {liveApiRequests.map((reqItem, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: theme === 'light' ? '#f8fafc' : 'rgba(0, 0, 0, 0.3)',
                              border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.04)',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '0.72rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                color: reqItem.method === 'GET' ? '#00f5ff' : reqItem.method === 'POST' ? '#ff4d8d' : '#eab308',
                                fontWeight: '900',
                                fontFamily: 'monospace'
                              }}>
                                {reqItem.method}
                              </span>
                              <span style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: '500' }}>
                                {reqItem.url}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ color: '#27c93f', fontWeight: 'bold' }}>{reqItem.status}</span>
                              <span style={{ color: theme === 'light' ? '#475569' : '#8e8ea8', fontSize: '0.65rem' }}>{reqItem.latency}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Terminal Logging with filters, search, and pause */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3 className={styles.panelTitle} style={{ margin: 0 }}>Interactive Console Stream</h3>
                          <div style={{ width: '6px', height: '6px', backgroundColor: isConsolePaused ? '#eab308' : '#27c93f', borderRadius: '50%', boxShadow: isConsolePaused ? '0 0 8px #eab308' : '0 0 8px #27c93f', display: 'inline-block' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className={styles.ctrlBtn}
                            style={{ padding: '4px 10px', fontSize: '0.62rem', borderColor: isConsolePaused ? '#00f5ff' : '#cbd5e1', color: isConsolePaused ? '#00f5ff' : 'inherit' }}
                            onClick={() => setIsConsolePaused(!isConsolePaused)}
                          >
                            {isConsolePaused ? 'RESUME STREAM' : 'PAUSE STREAM'}
                          </button>
                        </div>
                      </div>

                      {/* Log Console Controls Row */}
                      <div style={{ display: 'flex', gap: '10px', margin: '15px 0', flexWrap: 'wrap' }}>
                        {/* Console Category Selector */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {['ALL', 'SYS', 'DB', 'TRAFFIC'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setConsoleFilter(cat)}
                              style={{
                                background: consoleFilter === cat ? (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.08)') : 'transparent',
                                border: '1px solid ' + (consoleFilter === cat ? (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.2)') : 'rgba(255, 255, 255, 0.05)'),
                                color: consoleFilter === cat ? '#ffffff' : (theme === 'light' ? '#475569' : '#8e8ea8'),
                                fontSize: '0.6rem',
                                fontWeight: 'bold',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Console Search Input */}
                        <input
                          type="text"
                          placeholder="Search logs..."
                          value={consoleSearch}
                          onChange={(e) => setConsoleSearch(e.target.value)}
                          className={styles.formInput}
                          style={{ flex: 1, padding: '4px 10px', fontSize: '0.7rem', minWidth: '120px', height: '26px' }}
                        />
                      </div>

                      {/* Terminal screen */}
                      <div className={styles.consoleBox} style={{ height: '175px', padding: '12px', background: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className={styles.terminalBody} style={{ minHeight: '145px', maxHeight: '145px' }}>
                          {monitorLogs
                            .filter(log => consoleFilter === 'ALL' || log.type === consoleFilter)
                            .filter(log => consoleSearch === '' || log.message.toLowerCase().includes(consoleSearch.toLowerCase()))
                            .map((log, idx) => (
                              <div key={idx} style={{
                                color: log.type === 'ERR' ? '#ff3b7e' : log.type === 'SYS' ? '#38bdf8' : log.type === 'DB' ? '#c18fff' : '#10b981',
                                fontFamily: 'monospace',
                                fontSize: '0.68rem',
                                lineBreak: 'anywhere'
                              }}>
                                [{new Date().toLocaleTimeString()}] {log.message}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Diagnostics Grid: Client, Server, Database terminals */}
                  <div className={styles.diagnosticsGrid} style={{ marginTop: '25px' }}>

                    {/* Card 1: Client Node Terminal */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: clientStatus === 'ONLINE' ? '#27c93f' : '#ff3b7e', borderRadius: '50%', boxShadow: clientStatus === 'ONLINE' ? '0 0 8px #27c93f' : '0 0 8px #ff3b7e' }} />
                          <h3 className={styles.panelTitle} style={{ margin: 0 }}>Client Diagnostics</h3>
                        </div>
                        <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#10b981' }}>
                          CLIENT NODE
                        </span>
                      </div>

                      <div className={styles.consoleBox} style={{ fontSize: '0.72rem', gap: '10px', marginTop: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Client Status:</span>
                          <span style={{ fontWeight: 'bold', color: clientStatus === 'ONLINE' ? '#27c93f' : '#ff3b7e' }}>{clientStatus}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Session Uptime:</span>
                          <span style={{ fontWeight: 'bold', color: '#00f5ff' }}>
                            {Math.floor(clientSessionUptime / 3600)}h {Math.floor((clientSessionUptime % 3600) / 60)}m {clientSessionUptime % 60}s
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Client Platform:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{navigator.platform || 'Unknown'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Screen Resolution:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{window.screen.width} x {window.screen.height}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Memory Allocated:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                            {window.performance && window.performance.memory ? Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB' : 'Simulated 2048 MB'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Active Language:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{navigator.language || 'en-US'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Server Node Terminal */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: serverStatus === 'ONLINE' ? '#27c93f' : '#ff3b7e', borderRadius: '50%', boxShadow: serverStatus === 'ONLINE' ? '0 0 8px #27c93f' : '0 0 8px #ff3b7e' }} />
                          <h3 className={styles.panelTitle} style={{ margin: 0 }}>Server Diagnostics</h3>
                        </div>
                        <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(0, 245, 255, 0.15)', borderColor: '#00f5ff', color: '#00f5ff' }}>
                          SERVER NODE
                        </span>
                      </div>

                      <div className={styles.consoleBox} style={{ fontSize: '0.72rem', gap: '10px', marginTop: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Process PID:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff', fontFamily: 'monospace' }}>{monitorData.server.pid}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Process RAM (RSS):</span>
                          <span style={{ fontWeight: 'bold', color: '#ff4d8d' }}>{monitorData.server.rssMB} MB</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Node Uptime:</span>
                          <span style={{ fontWeight: 'bold', color: '#27c93f' }}>
                            {Math.floor(monitorData.server.nodeUptimeSeconds / 3600)}h {Math.floor((monitorData.server.nodeUptimeSeconds % 3600) / 60)}m {monitorData.server.nodeUptimeSeconds % 60}s
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Active CPU Cores:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>{monitorData.server.arch.toUpperCase()} Node Cores</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Event Loop Latency:</span>
                          <span style={{ fontWeight: 'bold', color: '#00f5ff' }}>1.2 ms</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Active Threadpool:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>UV Threads (4)</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Database Core Terminal */}
                    <div className={styles.telemetryPanel} style={{ padding: '25px' }}>
                      <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: monitorData.database.state === 'CONNECTED' ? '#27c93f' : '#ff3b7e', borderRadius: '50%', boxShadow: monitorData.database.state === 'CONNECTED' ? '0 0 8px #27c93f' : '0 0 8px #ff3b7e' }} />
                          <h3 className={styles.panelTitle} style={{ margin: 0 }}>Database Diagnostics</h3>
                        </div>
                        <span className={styles.panelTag} style={{ position: 'static', background: 'rgba(189, 92, 250, 0.15)', borderColor: '#bd5cfa', color: '#bd5cfa' }}>
                          DATABASE CORE
                        </span>
                      </div>

                      <div className={styles.consoleBox} style={{ fontSize: '0.72rem', gap: '10px', marginTop: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>MongoDB Host:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={monitorData.database.host}>{monitorData.database.host}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>MongoDB Port:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff', fontFamily: 'monospace' }}>{monitorData.database.port}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Connection State:</span>
                          <span style={{ fontWeight: 'bold', color: monitorData.database.state === 'CONNECTED' ? '#27c93f' : '#ff3b7e' }}>{monitorData.database.state}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Connection Pool:</span>
                          <span style={{ fontWeight: 'bold', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>Mongoose (1 Active)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>R/W Operations:</span>
                          <span style={{ fontWeight: 'bold', color: '#00f5ff' }}>92% R / 8% W</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>Average Query Time:</span>
                          <span style={{ fontWeight: 'bold', color: '#27c93f' }}>4.5 ms</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Full-width Active Error Incident Diagnostics Panel */}
                  <div className={styles.telemetryPanel} style={{ marginTop: '25px', padding: '25px', borderColor: monitorData.errors && monitorData.errors.length > 0 ? '#ff3b7e' : 'rgba(16, 185, 129, 0.3)' }}>
                    <div className={styles.panelTitleContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className={styles.panelTitleIcon}>
                          <AlertTriangle size={16} style={{ color: monitorData.errors && monitorData.errors.length > 0 ? '#ff3b7e' : '#10b981' }} />
                        </div>
                        <h3 className={styles.panelTitle} style={{ margin: 0 }}>Active Error Incident Diagnostics</h3>

                        {/* Pulsing Status Dot */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '10px' }}>
                          <span
                            className={monitorData.errors && monitorData.errors.length > 0 ? styles.pulseRed : styles.statusPulse}
                            style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: monitorData.errors && monitorData.errors.length > 0 ? '#ff3b7e' : '#10b981',
                              borderRadius: '50%',
                              display: 'inline-block'
                            }}
                          />
                          <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: monitorData.errors && monitorData.errors.length > 0 ? '#ff3b7e' : '#10b981' }}>
                            {monitorData.errors && monitorData.errors.length > 0 ? `${monitorData.errors.length} INCIDENT(S) DETECTED` : 'SYSTEM STATUS STABLE'}
                          </span>
                        </div>
                      </div>

                      {/* Clear Button */}
                      {monitorData.errors && monitorData.errors.length > 0 && (
                        <button
                          className={styles.ctrlBtn}
                          style={{ padding: '6px 12px', borderColor: '#ff3b7e', color: '#ff3b7e' }}
                          onClick={clearErrorLedger}
                        >
                          CLEAR INCIDENTS
                        </button>
                      )}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      {(!monitorData.errors || monitorData.errors.length === 0) ? (
                        <div style={{ textAlign: 'center', padding: '30px 15px', color: theme === 'light' ? '#475569' : '#8e8ea8', fontSize: '0.75rem', fontFamily: 'monospace', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                          [ SYSTEM STATUS SECURED - ZERO ENDPOINT ANOMALIES DETECTED ]
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {monitorData.errors.map((errItem, idx) => {
                            const errorDate = new Date(errItem.timestamp).toLocaleTimeString() + ' ' + new Date(errItem.timestamp).toLocaleDateString();
                            const isExpanded = expandedErrorIndex === idx;
                            return (
                              <div
                                key={idx}
                                style={{
                                  background: theme === 'light' ? '#fffafb' : 'rgba(255, 59, 126, 0.02)',
                                  border: '1.5px solid ' + (theme === 'light' ? '#fecdd3' : 'rgba(255, 59, 126, 0.15)'),
                                  borderRadius: '8px',
                                  padding: '15px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '10px'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <span style={{
                                      background: 'rgba(255, 59, 126, 0.12)',
                                      border: '1px solid #ff3b7e',
                                      color: '#ff3b7e',
                                      fontSize: '0.62rem',
                                      fontWeight: '900',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      fontFamily: 'monospace'
                                    }}>
                                      {errItem.method}
                                    </span>
                                    <span style={{
                                      color: theme === 'light' ? '#0f172a' : '#ffffff',
                                      fontWeight: 'bold',
                                      fontSize: '0.78rem',
                                      fontFamily: 'monospace'
                                    }}>
                                      {errItem.path}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: '0.68rem', color: theme === 'light' ? '#64748b' : '#8e8ea8' }}>
                                    {errorDate}
                                  </span>
                                </div>

                                <div style={{
                                  color: theme === 'light' ? '#991b1b' : '#ff4d8d',
                                  fontSize: '0.78rem',
                                  fontWeight: 'bold',
                                  fontFamily: 'sans-serif'
                                }}>
                                  {errItem.message}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                  <button
                                    className={styles.ctrlBtn}
                                    style={{
                                      fontSize: '0.62rem',
                                      padding: '4px 8px',
                                      borderColor: isExpanded ? '#00f5ff' : 'rgba(255, 255, 255, 0.15)',
                                      color: isExpanded ? '#00f5ff' : 'inherit'
                                    }}
                                    onClick={() => setExpandedErrorIndex(isExpanded ? null : idx)}
                                  >
                                    {isExpanded ? 'HIDE DEBUG DETAILS' : 'VIEW FULL DETAILS & STACK TRACE'}
                                  </button>
                                </div>

                                {isExpanded && (
                                  <div style={{ marginTop: '10px' }}>
                                    <pre className={styles.errorConsoleBox}>{errItem.stack}</pre>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#8e8ea8' }}>
                  [ SECURING CONNECTION STATE TELEMETRY... ]
                </div>
              )}
            </div>
          )}

        </main>

        {/* Custom Confirmation Modal */}
        {confirmModal.show && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <span className={styles.modalWarningDot}>■</span>
                <span>{confirmModal.title}</span>
              </div>
              <div className={styles.modalBody}>
                <p>{confirmModal.message}</p>
              </div>
              <div className={styles.modalActions}>
                <button
                  className={`${styles.ctrlBtn} ${styles.ctrlBtnDel}`}
                  onClick={confirmModal.onConfirm}
                >
                  CONFIRM DELETION
                </button>
                <button
                  className={styles.ctrlBtn}
                  onClick={() => setConfirmModal({ show: false, title: '', message: '', onConfirm: null })}
                >
                  ABORT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Notifications Panel */}
        {notification.show && (
          <div className={`${styles.notificationBox} ${notification.type === 'success' ? styles.notifySuccess : styles.notifyError}`}>
            [ {notification.message.toUpperCase()} ]
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
