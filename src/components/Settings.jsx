import React, { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/designTokens.css';

const Settings = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setIsOpen(true)} style={styles.iconButton}>
        <SettingsIcon size={24} color="var(--fds-dark-mode-gray-70)" />
      </button>

      {isOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Settings & Info</h2>
              <button onClick={() => setIsOpen(false)} style={styles.iconButton}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.infoGroup}>
                <label style={styles.label}>Account Name</label>
                <div style={styles.value}>{session?.username || '@username'}</div>
              </div>

              <div style={styles.infoGroup}>
                <label style={styles.label}>Your Search Code (Share this)</label>
                <div style={styles.codeBox}>{session?.searchCode || '------'}</div>
              </div>

              <div style={styles.infoGroup}>
                <label style={styles.label}>Your Passphrase (2FA)</label>
                <div style={styles.codeBox}>{session?.passphrase || '•••••••••••••••'}</div>
                <p style={styles.warning}>Keep this safe. Do not share.</p>
              </div>

              <button onClick={handleLogout} style={styles.logoutButton}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
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
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-md)',
    width: '90%',
    maxWidth: '400px',
    boxShadow: 'var(--shadow-4)'
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderBottom: '1px solid rgba(17, 17, 18, 0.1)'
  },
  modalTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600'
  },
  modalContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '12px',
    color: 'var(--fds-dark-mode-gray-50)',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  value: {
    fontSize: '16px',
    fontWeight: '500'
  },
  codeBox: {
    backgroundColor: 'var(--fds-blue-05)',
    padding: '12px',
    borderRadius: 'var(--radius-xs)',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: 'var(--fds-blue-80)',
    border: '1px solid var(--fds-blue-30)',
  },
  warning: {
    fontSize: '11px',
    color: '#E0245E',
    margin: 0
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: '#E0245E',
    border: '1px solid #E0245E',
    padding: '12px',
    borderRadius: 'var(--radius-xs)',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Settings;
