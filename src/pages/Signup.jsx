import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { generateRandomString, hashString, encryptData } from '../utils/crypto';
import { apiClient } from '../services/apiClient';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [step, setStep] = useState(1);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [savedPassphrase, setSavedPassphrase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !legalAccepted) return;
    
    setLoading(true);
    try {
      const encryptedPassword = encryptData(password);
      
      const res = await apiClient.post('register', { 
        username, 
        encryptedPassword 
      });

      if (res.error) {
        alert(res.error);
        setLoading(false);
        return;
      }

      setPassphrase(res.passphrase);
      setSearchCode(res.searchCode);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Registration failed. Make sure your backend is configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSignup = () => {
    if (!savedPassphrase) return;
    window.location.href = '/login';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{...styles.container, background: 'transparent'}}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-card"
        style={styles.card}
      >
        <h1 style={styles.logo}>Ghost Chat</h1>
        
        {step === 1 ? (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleInitialSubmit} 
            style={styles.form}
          >
            <h2 style={styles.title}>Create Secure Identity</h2>
            <p style={styles.subtitle}>No email. No phone number. Complete privacy.</p>

            <input 
              type="text" 
              placeholder="Create a username (@username)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input"
              required
            />
            
            <div style={styles.inputWrapper}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password" 
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

            <div style={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                id="legal" 
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
              />
              <label htmlFor="legal" style={styles.legalText}>
                I agree to the <a href="/privacy" target="_blank" rel="noreferrer" style={styles.link}>Privacy Policy</a>, <a href="/terms" target="_blank" rel="noreferrer" style={styles.link}>Terms of Service</a>, and <a href="/disclaimer" target="_blank" rel="noreferrer" style={styles.link}>Disclaimer</a>.
              </label>
            </div>

            <button 
              type="submit" 
              className="glass-button"
              style={{opacity: (!username || !password || !legalAccepted || loading) ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}
              disabled={!username || !password || !legalAccepted || loading}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%' }}
                  />
                  Creating...
                </>
              ) : 'Sign Up Securely'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Link to="/login" style={styles.link}>Already have account? Log in</Link>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={styles.form}
          >
            <h2 style={styles.title}>Your Credentials</h2>
            <p style={styles.warningText}>
              IMPORTANT: Save these immediately. They cannot be recovered.
            </p>
            
            <label style={styles.label}>Your Passphrase (2FA)</label>
            <div style={styles.passphraseBox}>
              <span>{passphrase}</span>
              <button onClick={() => copyToClipboard(passphrase)} style={styles.copyButton} title="Copy Passphrase">
                <Copy size={16} />
              </button>
            </div>

            <label style={styles.label}>Your Search Code (Share this)</label>
            <div style={styles.passphraseBox}>
              <span>{searchCode}</span>
              <button onClick={() => copyToClipboard(searchCode)} style={styles.copyButton} title="Copy Search Code">
                <Copy size={16} />
              </button>
            </div>

            <div style={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                id="saved" 
                checked={savedPassphrase}
                onChange={(e) => setSavedPassphrase(e.target.checked)}
              />
              <label htmlFor="saved" style={styles.legalText}>
                I have securely saved my passphrase and search code.
              </label>
            </div>

            <button 
              onClick={handleFinalSignup} 
              className="glass-button"
              style={{marginTop: '15px', opacity: savedPassphrase ? 1 : 0.5}}
              disabled={!savedPassphrase}
            >
              Complete Registration
            </button>
          </motion.div>
        )}
      </motion.div>

      <Footer />
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
    fontSize: 'clamp(24px, 8vw, 36px)',
    lineHeight: '1.2',
    paddingBottom: '2px',
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
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginTop: '10px',
  },
  legalText: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  link: {
    color: 'var(--brand-primary)',
    textDecoration: 'none',
  },
  warningText: {
    fontSize: '12px',
    color: 'var(--brand-warning)',
    backgroundColor: 'rgba(255, 159, 10, 0.1)',
    padding: '10px',
    borderRadius: 'var(--radius-xs)',
    textAlign: 'center',
    fontWeight: '500',
  },
  passphraseBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '12px 15px',
    borderRadius: 'var(--radius-xs)',
    fontFamily: 'monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'var(--brand-primary)',
    border: '1px solid var(--glass-border)',
    marginBottom: '10px',
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginTop: '5px',
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

export default Signup;
