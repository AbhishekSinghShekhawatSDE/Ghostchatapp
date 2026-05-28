import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateRandomString, hashString } from '../utils/crypto';
import { apiClient } from '../services/apiClient';
import '../styles/designTokens.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [step, setStep] = useState(1);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [savedPassphrase, setSavedPassphrase] = useState(false);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !legalAccepted) return;
    
    try {
      const passwordHash = await hashString(password);
      
      const res = await apiClient.post('register', { 
        username, 
        passwordHash 
      });

      if (res.error) {
        alert(res.error);
        return;
      }

      setPassphrase(res.passphrase);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Registration failed. Make sure your backend is configured.');
    }
  };

  const handleFinalSignup = () => {
    if (!savedPassphrase) return;
    // Redirect to dashboard (mock)
    alert('Signup Complete! Proceed to login.');
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <h1 style={styles.logo}>AnonymousChat</h1>
        
        {step === 1 && (
          <form onSubmit={handleInitialSubmit} style={styles.form}>
            <h2 style={styles.title}>Sign up to chat privately</h2>
            
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

            <div style={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                id="legal" 
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
                required
              />
              <label htmlFor="legal" style={styles.legalText}>
                I agree to the Privacy Policy, Terms of Service, and Disclaimer.
              </label>
            </div>

            <button 
              type="submit" 
              style={{...styles.button, opacity: legalAccepted && username && password ? 1 : 0.7}}
              disabled={!legalAccepted || !username || !password}
            >
              Sign up
            </button>
          </form>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={styles.form}
          >
            <h2 style={styles.title}>Your Passphrase (2FA)</h2>
            <p style={styles.warningText}>
              IMPORTANT: Save this passphrase immediately. You will need it to log in, and it cannot be recovered.
            </p>
            
            <div style={styles.passphraseBox}>
              {passphrase}
            </div>

            <div style={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                id="saved" 
                checked={savedPassphrase}
                onChange={(e) => setSavedPassphrase(e.target.checked)}
              />
              <label htmlFor="saved" style={styles.legalText}>
                I have securely saved my passphrase.
              </label>
            </div>

            <button 
              onClick={handleFinalSignup} 
              style={{...styles.button, opacity: savedPassphrase ? 1 : 0.7}}
              disabled={!savedPassphrase}
            >
              Complete Registration
            </button>
          </motion.div>
        )}
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
    fontFamily: 'cursive', // Placeholder for a brand font
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
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginTop: '10px',
  },
  legalText: {
    fontSize: '12px',
    color: 'var(--fds-dark-mode-gray-50)',
    lineHeight: '1.4',
  },
  warningText: {
    fontSize: '14px',
    color: '#E0245E',
    textAlign: 'center',
    fontWeight: '500',
  },
  passphraseBox: {
    backgroundColor: 'var(--fds-blue-05)',
    padding: '15px',
    borderRadius: 'var(--radius-xs)',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: 'var(--fds-blue-80)',
    border: '1px solid var(--fds-blue-30)',
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    gap: '15px',
    fontSize: '12px',
    color: 'var(--fds-dark-mode-gray-50)',
  }
};

export default Signup;
