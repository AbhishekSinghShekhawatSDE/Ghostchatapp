import React from 'react';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Disclaimer = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.content}>
          <p><strong>1. Accuracy:</strong> We do not guarantee the accuracy or reliability of any user-generated content on this platform.</p>
          <p><strong>2. User Responsibility:</strong> You chat at your own risk. Do not share personally identifiable information with strangers.</p>
          <p><strong>3. No Warranties:</strong> This application is provided without any warranties, express or implied. We do not guarantee 100% uptime or absolute security against advanced cryptographic attacks.</p>
        </div>
      </div>
      <div style={{ marginTop: 'auto', width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)'
  },
  card: {
    backgroundColor: 'var(--bg-surface)',
    padding: '40px',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-1)',
    maxWidth: '800px',
    width: '100%'
  },
  title: {
    marginTop: 0,
    borderBottom: '1px solid rgba(17,17,18,0.1)',
    paddingBottom: '20px'
  },
  content: {
    lineHeight: '1.6',
    color: 'var(--fds-dark-mode-gray-80)'
  }
};

export default Disclaimer;
