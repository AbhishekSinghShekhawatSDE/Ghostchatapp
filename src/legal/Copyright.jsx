import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Copyright = () => {
  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card" 
        style={styles.card}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>Ghost Chat Copyright</h1>
          <p style={styles.tagline}>Anonymous. Secure. Temporary.</p>
        </div>
        
        <div style={styles.content}>
          <p style={styles.effectiveDate}><strong>Copyright &copy; 2026 Abhishek Singh Shekhawat. All Rights Reserved.</strong></p>

          <h2>1. Ownership of Intellectual Property</h2>
          <p>The entire source code, conceptual architecture, graphic design elements, logos, custom animations (including but not limited to the active user pulse and glassmorphic layouts), and the underlying cryptographic methodologies implemented in the Ghost Chat application are the exclusive intellectual property of Abhishek Singh Shekhawat.</p>

          <h2>2. License and Permitted Uses</h2>
          <p>Ghost Chat is a proprietary software application. While the service is provided free of charge for individual users to communicate securely, this does not grant any user, corporation, or entity the right to copy, reverse-engineer, distribute, sell, or create derivative works from the application's source code or its visual design system.</p>
          <ul>
            <li>You may use the application as intended through a standard web browser.</li>
            <li>You may link to the Ghost Chat homepage from external websites or social media.</li>
            <li>You may <strong>not</strong> scrape, frame, or embed the application within another website without explicit, written permission from the copyright holder.</li>
          </ul>

          <h2>3. Protection Against Unauthorized Reproduction</h2>
          <p>Any unauthorized reproduction, cloning, or distribution of this software is strictly prohibited and will be met with immediate legal action. We actively monitor the web for unauthorized replicas of our Glassmorphic UI design system and our proprietary 24-hour auto-deletion backend infrastructure.</p>

          <h2>4. User-Generated Content Exemption</h2>
          <p>Ghost Chat claims no ownership or copyright over the text messages transmitted by users through the platform. Given the anonymous and temporary nature of the service, all user-generated content is the sole responsibility of the sender and is irrevocably destroyed after 24 hours.</p>

          <h2>5. Contact Information</h2>
          <p>For licensing inquiries, press packages, or to request permission to feature the Ghost Chat application or its design system in a publication, please contact the copyright holder directly at the provided administrative contact points on our website.</p>
        </div>
      </motion.div>
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
    padding: '50px',
    maxWidth: '900px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '30px'
  },
  title: {
    marginTop: 0,
    marginBottom: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    fontSize: 'clamp(28px, 5vw, 42px)',
    letterSpacing: '-1px',
    background: 'linear-gradient(135deg, #fff, #AEAEB2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  tagline: {
    margin: 0,
    fontSize: '16px',
    color: 'var(--brand-primary)',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  content: {
    lineHeight: '1.8',
    color: 'var(--text-secondary)',
    fontSize: '15px'
  },
  effectiveDate: {
    fontStyle: 'italic',
    marginBottom: '30px'
  }
};

export default Copyright;
