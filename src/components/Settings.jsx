import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, X, Copy, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/designTokens.css';

const Settings = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('security');
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
                <h2 style={styles.modalTitle}>Settings</h2>
                <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
                  <X size={24} />
                </button>
              </div>

              <div style={styles.tabContainer}>
                <button 
                  style={{...styles.tabButton, ...(activeTab === 'security' ? styles.activeTab : {})}} 
                  onClick={() => setActiveTab('security')}
                >
                  Security
                </button>
                <button 
                  style={{...styles.tabButton, ...(activeTab === 'about' ? styles.activeTab : {})}} 
                  onClick={() => setActiveTab('about')}
                >
                  About Ghost Chat
                </button>
              </div>

              {activeTab === 'security' && (
                <>
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
                </>
              )}

              {activeTab === 'about' && (
                <div style={styles.aboutContainer}>
                  <h3 style={styles.aboutHeader}>MISSION</h3>
                  <p style={styles.aboutText}>Ghost Chat is anonymous messaging. No tracking. No ads. No data selling. Chat disappears after 24 hours.</p>
                  
                  <h3 style={styles.aboutHeader}>HOW IT WORKS</h3>
                  <p style={styles.aboutText}>Sign up with username and password. Get a unique 6-digit code. Share it with friends. Chat anonymously. All messages delete after 24 hours automatically.</p>
                  
                  <h3 style={styles.aboutHeader}>PRIVACY</h3>
                  <p style={styles.aboutText}>Your chats are private and temporary. Messages automatically delete after 24 hours. Your account stays, your history doesn't.</p>
                  
                  <h3 style={styles.aboutHeader}>FEATURES</h3>
                  <ul style={styles.aboutList}>
                    <li>Anonymous by design</li>
                    <li>6-digit code search</li>
                    <li>Temporary messages</li>
                    <li>No tracking</li>
                    <li>No ads</li>
                    <li>No data selling</li>
                  </ul>

                  <h3 style={styles.aboutHeader}>SECURITY</h3>
                  <p style={styles.aboutText}>Your data is encrypted. Conversations are private and secure.</p>

                  <h3 style={styles.aboutHeader}>APP INFO</h3>
                  <ul style={styles.aboutList}>
                    <li>Version: 1.0</li>
                    <li>Created by: Abhishek Singh Shekhawat</li>
                  </ul>
                </div>
              )}
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
  },
  tabContainer: {
    display: 'flex',
    marginBottom: '20px',
    borderBottom: '1px solid var(--glass-border)',
  },
  tabButton: {
    flex: 1,
    padding: '10px 0',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    color: 'var(--brand-primary)',
    borderBottomColor: 'var(--brand-primary)',
  },
  aboutContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    color: 'var(--text-primary)',
  },
  aboutHeader: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--brand-primary)',
    letterSpacing: '1px',
    margin: '0 0 5px 0',
    textTransform: 'uppercase'
  },
  aboutText: {
    fontSize: '13px',
    lineHeight: '1.5',
    margin: 0,
    color: 'var(--text-secondary)',
  },
  aboutList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
  }
};

export default Settings;
