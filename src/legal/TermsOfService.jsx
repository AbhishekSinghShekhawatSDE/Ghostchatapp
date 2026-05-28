import React from 'react';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const TermsOfService = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Terms of Service</h1>
        <div style={styles.content}>
          <p><strong>1. User Responsibilities:</strong> You are solely responsible for maintaining the confidentiality of your passphrase. If lost, the account cannot be recovered.</p>
          <p><strong>2. Prohibited Conduct:</strong> You may not use this service for illegal activities, harassment, or distributing malicious content.</p>
          <p><strong>3. Limitation of Liability:</strong> The service is provided "as is". We are not liable for any data loss, damages, or issues arising from the use of this free platform.</p>
          <p><strong>4. Dispute Resolution:</strong> Any disputes shall be resolved through informal negotiation. The creators hold no legal liability for user-generated content.</p>
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

export default TermsOfService;
