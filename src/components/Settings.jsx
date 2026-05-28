import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, X, Copy, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/designTokens.css';

const Settings = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setIsOpen(true)} style={styles.iconButton}>
        <SettingsIcon size={24} color="var(--text-primary)" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div style={styles.modalOverlay}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="glass-card settings-modal"
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Security Settings</h2>
                <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
                  <X size={24} />
                </button>
              </div>

              <div style={styles.section}>
                <label style={styles.label}>Your Username</label>
                <div style={styles.valueRow}>
                  <div style={styles.valueBox}>{session?.username || '@username'}</div>
                  <button onClick={() => copyToClipboard(session?.username)} style={styles.copyButton} title="Copy Username">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div style={styles.section}>
                <label style={styles.label}>Your Search Code (Share to connect)</label>
                <div style={styles.valueRow}>
                  <div style={styles.valueBox}>{session?.searchCode || '------'}</div>
                  <button onClick={() => copyToClipboard(session?.searchCode)} style={styles.copyButton} title="Copy Search Code">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div style={styles.section}>
                <label style={styles.label}>Your Passphrase (2FA)</label>
                <div style={styles.valueRow}>
                  <div style={styles.valueBox}>{session?.passphrase || '•••••••••••••••'}</div>
                  <button onClick={() => copyToClipboard(session?.passphrase)} style={styles.copyButton} title="Copy Passphrase">
                    <Copy size={16} />
                  </button>
                </div>
                <p style={styles.warning}>Never share your passphrase with anyone.</p>
              </div>

              <div style={styles.actions}>
                <button onClick={handleLogout} className="glass-button" style={styles.logoutButton}>
                  <LogOut size={16} style={{marginRight: '8px'}} />
                  Sign Out Completely
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  },
  valueRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  valueBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '12px 15px',
    borderRadius: 'var(--radius-xs)',
    fontFamily: 'monospace',
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--brand-primary)',
    border: '1px solid var(--glass-border)',
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderRadius: 'var(--radius-xs)',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  warning: {
    fontSize: '12px',
    color: 'var(--brand-warning)',
    marginTop: '8px',
    fontWeight: '500'
  },
  actions: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid var(--glass-border)',
    display: 'flex',
    justifyContent: 'center',
  },
  logoutButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 69, 58, 0.1)',
    color: 'var(--brand-error)',
    border: '1px solid rgba(255, 69, 58, 0.3)',
    boxShadow: 'none',
  }
};

export default Settings;
