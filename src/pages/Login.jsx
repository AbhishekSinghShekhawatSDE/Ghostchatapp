import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
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
    <div className="auth-container" style={{background: 'transparent'}}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-card auth-card"
      >
        <h1 className="auth-logo">Ghost Chat</h1>
        
        <form onSubmit={handleLogin} className="auth-form">
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
          
          <div style={styles.inputWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              style={styles.inputWithIcon}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div style={styles.inputWrapper}>
            <input 
              type={showPassphrase ? "text" : "password"} 
              placeholder="Passphrase (2FA)" 
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="glass-input"
              style={styles.inputWithIcon}
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassphrase(!showPassphrase)}
              style={styles.eyeIcon}
              title={showPassphrase ? "Hide passphrase" : "Show passphrase"}
            >
              {showPassphrase ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p style={styles.errorText}>{error}</p>}

          <button 
            type="submit" 
            className="glass-button"
            style={{opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}
            disabled={loading}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%' }}
                />
                Authenticating...
              </>
            ) : 'Log in Securely'}
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/signup" style={styles.link}>Don't have account? Sign up</Link>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

const styles = {
  title: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '8px',
    marginTop: 0,
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: '12px',
    marginTop: 0,
  },
  links: {
    marginTop: '15px',
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
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputWithIcon: {
    width: '100%',
    paddingRight: '40px',
    boxSizing: 'border-box',
  },
  eyeIcon: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    transition: 'color 0.2s',
  }
};

export default Login;
