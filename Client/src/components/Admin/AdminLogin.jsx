import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('adminTheme') || 'light');
  const [statusText, setStatusText] = useState('SYSTEM_GATE: ONLINE // SESSION_STATUS: DECRYPT_PENDING');
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('adminTheme', newTheme);
  };

  useEffect(() => {
    // If token already exists, verify it
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            navigate('/admin.aji2004');
          } else {
            localStorage.removeItem('adminToken');
          }
        })
        .catch(() => {
          localStorage.removeItem('adminToken');
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setStatusText('DECRYPTING CONSOLE GATE... PLEASE WAIT');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Decryption credentials rejected by security gate.');
      }

      setStatusText('ACCESS GRANTED // INITIALIZING DASHBOARD...');
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', data.admin.username);

      setTimeout(() => {
        navigate('/admin.aji2004');
      }, 800);
    } catch (err) {
      setError(`[ EXCEPTION ] ${err.message.toUpperCase()}`);
      setStatusText('SYSTEM_GATE: ONLINE // SESSION_STATUS: DECRYPT_PENDING');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${styles.loginSection} ${theme === 'light' ? styles.lightTheme : ''}`}>
      <button
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        type="button"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <div className={styles.loginCard}>
        <h2 className={styles.title}>System Decryption</h2>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            [ SECURITY ACCESS CHECK ]
          </div>
          <div className={styles.formStatus}>
            {statusText}
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.inputFieldWrapper}>
                <label className={styles.inputLabel}>Admin Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.textInput}
                  placeholder="e.g. admin"
                  required
                  disabled={loading}
                />
              </div>
              <div className={styles.inputFieldWrapper}>
                <label className={styles.inputLabel}>Decryption Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.textInput}
                  placeholder="••••••••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && <div className={styles.errorText}>{error}</div>}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Decrypting...' : 'Decrypt Console Gate'}
            </button>
          </form>
        </div>
        <Link to="/" className={styles.backHome}>
          &larr; Return to Public Portfolio
        </Link>
      </div>
    </section>
  );
};

export default AdminLogin;
