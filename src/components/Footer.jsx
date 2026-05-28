import React from 'react';
import '../styles/designTokens.css';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.footerLinks}>
        <a href="/privacy" className="footer-link" target="_blank" rel="noreferrer">Privacy Policy</a>
        <a href="/terms" className="footer-link" target="_blank" rel="noreferrer">Terms of Service</a>
        <a href="/disclaimer" className="footer-link" target="_blank" rel="noreferrer">Disclaimer</a>
        <a href="/copyright" className="footer-link" target="_blank" rel="noreferrer">Copyright</a>
      </div>
      <div style={styles.footerCredits}>
        <span className="footer-text">&copy; 2026 Ghost Chat</span>
        <span className="footer-text" style={{ margin: '0 8px' }}>|</span>
        <span className="footer-text">VISUAL LABEL = </span>
        <a href="https://www.abhisheksinghshekhawat.com/" target="_blank" rel="noreferrer" className="author-link" style={{ marginLeft: '4px' }}>
          ABHISHEK SINGH SHEKHAWAT
        </a>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    fontSize: '12px',
    paddingBottom: '20px',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  footerCredits: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Footer;
