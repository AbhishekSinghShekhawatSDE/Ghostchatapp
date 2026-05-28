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
    <div style={{...styles.container, background: 'transparent'}}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-card"
        style={styles.card}
      >
        <h1 style={styles.logo}>AnonymousChat</h1>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Secure Login</h2>
          <p style={styles.subtitle}>Enter your credentials to access your secure session.</p>
          
          <input 
            type="text" 
            placeholder="Username (@username)" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="glass-input"
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="glass-input"
            required
          />

          <input 
            type="password" 
            placeholder="Passphrase (2FA)" 
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="glass-input"
            required
          />

          {error && <p style={styles.errorText}>{error}</p>}

          <button 
            type="submit" 
            className="glass-button"
            style={{opacity: loading ? 0.5 : 1}}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Log in Securely'}
          </button>
        </form>

        <div style={styles.links}>
          <a href="/signup" style={styles.link}>Create new identity</a>
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
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  },
  logo: {
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    letterSpacing: '-1px',
    margin: '0 0 20px 0',
    background: 'linear-gradient(135deg, #fff, #AEAEB2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    fontSize: '20px',
    color: 'var(--text-primary)',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '5px',
    marginTop: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: '15px',
    marginTop: 0,
  },
  links: {
    marginTop: '25px',
    textAlign: 'center',
  },
  link: {
    color: 'var(--brand-primary)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  errorText: {
    color: 'var(--brand-error)',
    fontSize: '13px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    padding: '10px',
    borderRadius: 'var(--radius-xs)',
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    gap: '15px',
    fontSize: '12px',
    color: 'var(--text-tertiary)',
  }
};

export default Login;
