import React from 'react';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <div style={styles.content}>
          <p>Effective Date: 2026-05-28</p>
          <p><strong>1. Data Collection:</strong> We collect only the username and password hash you provide during signup. Passphrases are generated securely and hashed.</p>
          <p><strong>2. Storage Duration:</strong> All messages are permanently deleted after 24 hours. We do not keep historical logs of deleted messages on our primary database.</p>
          <p><strong>3. No Tracking:</strong> We do not use tracking cookies, analytics trackers, or any third-party data collection tools.</p>
          <p><strong>4. No Ads & No Data Selling:</strong> We do not serve advertisements and we will never sell your data.</p>
          <p><strong>5. User Rights:</strong> You have the right to abandon your account at any time. Messages self-destruct.</p>
          <p><strong>Contact:</strong> admin@anonymouschat.local</p>
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

export default PrivacyPolicy;
