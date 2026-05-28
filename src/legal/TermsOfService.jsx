import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const TermsOfService = () => {
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
          <h1 style={styles.title}>Ghost Chat Terms of Service</h1>
          <p style={styles.tagline}>Anonymous. Secure. Temporary.</p>
        </div>
        
        <div style={styles.content}>
          <p style={styles.effectiveDate}><strong>Effective Date:</strong> May 28, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Ghost Chat (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the Service. Ghost Chat is provided as a free, experimental communication tool focused entirely on user privacy and anonymity. By using this application, you acknowledge the inherent risks of digital communication and accept the unique limitations of an anonymous, auto-deleting platform.</p>

          <h2>2. Description of Service</h2>
          <p>Ghost Chat is a decentralized-style messaging platform that allows users to communicate anonymously using randomly generated search codes. We do not require email addresses, phone numbers, or real names. All messages are encrypted in transit and are subject to an irrevocable 24-hour auto-deletion protocol.</p>
          <p>The Service is designed to facilitate temporary communication. It is not intended to serve as a secure vault, an archive, or a permanent communication record. You understand and agree that any information you send through the Service will be destroyed 24 hours after submission.</p>

          <h2>3. User Responsibilities and Account Security</h2>
          <p>Because Ghost Chat does not collect personal identifiers, the security of your account rests entirely in your hands. When you create an identity, you are provided with a 6-digit Search Code, a Password, and a 15-character Passphrase (2FA).</p>
          <ul>
            <li><strong>Credential Management:</strong> You are solely responsible for maintaining the confidentiality of your password and passphrase. You must store them securely (e.g., in an offline password manager).</li>
            <li><strong>No Account Recovery:</strong> You acknowledge that if you lose your password or passphrase, Ghost Chat cannot and will not recover your account. There is no "Forgot Password" feature because there is no email address linked to your account to send a recovery link to.</li>
            <li><strong>Account Abandonment:</strong> You may abandon your account at any time by ceasing to use it and discarding your credentials. Any remaining messages will automatically delete themselves within 24 hours.</li>
          </ul>

          <h2>4. Prohibited Conduct and Acceptable Use</h2>
          <p>While Ghost Chat champions privacy and anonymity, the Service must not be used as a shield for malicious, illegal, or harmful activities. By using the Service, you agree that you will not:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or to facilitate any illegal activity under applicable local, national, or international law.</li>
            <li>Harass, abuse, threaten, or advocate violence against any individual or group.</li>
            <li>Transmit any content that is defamatory, obscene, pornographic, or highly offensive.</li>
            <li>Distribute malware, viruses, trojans, or any other malicious code.</li>
            <li>Attempt to reverse-engineer, exploit, or bypass the cryptographic hash mechanisms or the 24-hour auto-deletion protocols.</li>
            <li>Use the Service to distribute spam or engage in phishing attacks.</li>
          </ul>
          <p>Ghost Chat reserves the right to block network access or terminate connections that demonstrate patterns of abuse, DDoS attacks, or excessive API rate limits, though we cannot identify individual users.</p>

          <h2>5. The 24-Hour Deletion Protocol</h2>
          <p>You explicitly acknowledge that all messages transmitted via Ghost Chat are temporary. The system is programmed to aggressively delete messages from the database exactly 24 hours after they are received by the server. You agree that Ghost Chat shall not be liable to you or to any third party for the deletion of any messages, data, or content. Do not use this service for information that you need to retain long-term.</p>

          <h2>6. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GHOST CHAT, ITS CREATORS, DEVELOPERS, AND HOSTING PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
          <ul>
            <li>Your access to, use of, or inability to access or use the Service;</li>
            <li>Any unauthorized access to or use of our secure servers and/or any hashes stored therein;</li>
            <li>Any bugs, viruses, or the like that may be transmitted to or through our Service by any third party;</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service.</li>
          </ul>
          <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind.</p>

          <h2>7. Dispute Resolution</h2>
          <p>In the event of a dispute arising out of or relating to these Terms of Service, both parties agree to attempt to resolve the dispute informally before pursuing any formal legal action. Because Ghost Chat collects no user data, identifying users in a legal context is technically impossible for the developers. Users agree that any claims against the creators must be pursued strictly individually, and you waive the right to participate in a class-action lawsuit.</p>

          <h2>8. Modifications to the Service and Terms</h2>
          <p>Ghost Chat reserves the right to modify, suspend, or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We may revise these Terms of Service at any time by updating this page. By continuing to use the Service after any such changes, you accept the new Terms of Service.</p>

          <h2>9. Entire Agreement</h2>
          <p>These Terms of Service, alongside our Privacy Policy, constitute the entire agreement between you and Ghost Chat regarding the use of the Service, superseding any prior agreements between you and Ghost Chat relating to your use of the Service.</p>
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

export default TermsOfService;
