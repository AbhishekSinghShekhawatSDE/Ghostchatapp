import React from 'react';
import '../styles/designTokens.css';

const Copyright = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Copyright Notice</h1>
        <div style={styles.content}>
          <p>&copy; 2026 AnonymousChat. All rights reserved.</p>
          <p>The code, design, and conceptual architecture of this web application are protected by copyright laws. Unauthorized reproduction or distribution is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
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

export default Copyright;
