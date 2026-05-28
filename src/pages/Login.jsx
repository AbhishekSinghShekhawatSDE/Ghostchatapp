import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import '../styles/designTokens.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password || !passphrase) return;

    const success = await login(username, password, passphrase);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h1 style={styles.logo}>AnonymousChat</h1>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Secure Login</h2>
          
          <input 
            type="text" 
            placeholder="Username (@username)" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input 
            type="password" 
            placeholder="Passphrase (2FA)" 
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.errorText}>{error}</p>}

          <button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div style={styles.links}>
          <a href="/signup" style={styles.link}>Create new account</a>
        </div>
      </motion.div>

      <div style={styles.footer}>
        <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
        <a href="/terms" target="_blank" rel="noreferrer">Terms of Service</a>
        <a href="/disclaimer" target="_blank" rel="noreferrer">Disclaimer</a>
        <a href="/copyright" target="_blank" rel="noreferrer">Copyright</a>
        <span>&copy; 2026 AnonymousChat</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    backgroundColor: 'var(--bg-surface)',
    padding: '40px',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-1)',
    width: '100%',
    maxWidth: '350px',
    border: '1px solid rgba(17, 17, 18, 0.1)',
  },
  logo: {
    textAlign: 'center',
    fontFamily: 'cursive',
    margin: '0 0 20px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    fontSize: '16px',
    color: 'var(--fds-dark-mode-gray-50)',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '10px',
  },
  input: {
    padding: '10px 12px',
    borderRadius: 'var(--radius-xs)',
    border: '1px solid var(--fds-dark-mode-gray-35)',
    backgroundColor: '#FAFAFA',
    fontSize: '14px',
  },
  button: {
    backgroundColor: 'var(--fds-blue-60)',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 'var(--radius-xs)',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
  links: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    color: 'var(--fds-blue-60)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  errorText: {
    color: '#E0245E',
    fontSize: '12px',
    textAlign: 'center',
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    gap: '15px',
    fontSize: '12px',
    color: 'var(--fds-dark-mode-gray-50)',
  }
};

export default Login;
