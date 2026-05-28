import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Clock, X } from 'lucide-react';
import '../styles/designTokens.css';

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setIsOpen(false);
  };

  const steps = [
    {
      icon: <Shield size={48} color="var(--fds-blue-60)" />,
      title: "Welcome to True Privacy",
      text: "We don't track your email or phone number. Your 15-character passphrase is the only way into this account."
    },
    {
      icon: <Users size={48} color="var(--fds-blue-60)" />,
      title: "Find Your Friends",
      text: "There is no public directory. Connect with people by sharing your 6-digit Search Code, found in the Settings gear."
    },
    {
      icon: <Clock size={48} color="var(--fds-blue-60)" />,
      title: "24-Hour Self-Destruct",
      text: "Speak freely. All messages are permanently and mathematically wiped from our servers 24 hours after sending."
    }
  ];

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={styles.modal}
      >
        <button onClick={handleClose} style={styles.closeBtn}>
          <X size={24} />
        </button>
        
        <div style={styles.content}>
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={styles.stepContainer}
          >
            <div style={styles.iconWrapper}>
              {steps[step].icon}
            </div>
            <h2 style={styles.title}>{steps[step].title}</h2>
            <p style={styles.text}>{steps[step].text}</p>
          </motion.div>
        </div>

        <div style={styles.footer}>
          <div style={styles.dots}>
            {steps.map((_, i) => (
              <div key={i} style={{...styles.dot, backgroundColor: step === i ? 'var(--fds-blue-60)' : 'var(--fds-blue-20)'}} />
            ))}
          </div>
          <button 
            onClick={() => {
              if (step < steps.length - 1) setStep(step + 1);
              else handleClose();
            }}
            style={styles.button}
          >
            {step < steps.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    width: '90%',
    maxWidth: '400px',
    borderRadius: 'var(--radius-md)',
    padding: '30px',
    boxShadow: 'var(--shadow-3)',
    position: 'relative',
    border: '1px solid var(--fds-dark-mode-gray-35)',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--fds-dark-mode-gray-50)',
  },
  content: {
    textAlign: 'center',
    marginTop: '20px',
    minHeight: '200px',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'var(--fds-blue-05)',
    padding: '20px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--text-primary)',
  },
  text: {
    fontSize: '15px',
    color: 'var(--fds-dark-mode-gray-70)',
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  },
  button: {
    backgroundColor: 'var(--fds-blue-60)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 'var(--radius-xs)',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default OnboardingModal;
