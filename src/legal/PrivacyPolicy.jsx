import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const PrivacyPolicy = () => {
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
          <h1 style={styles.title}>Ghost Chat Privacy Policy</h1>
          <p style={styles.tagline}>Anonymous. Secure. Temporary.</p>
        </div>
        
        <div style={styles.content}>
          <p style={styles.effectiveDate}><strong>Effective Date:</strong> May 28, 2026</p>
          
          <h2>1. The Ghost Chat Philosophy: Privacy as a Default</h2>
          <p>At Ghost Chat, we believe that privacy is not a luxury or a premium feature—it is a fundamental human right. In an era where every click, swipe, and message is tracked, logged, and monetized by massive tech conglomerates, we decided to build something radically different. We built a communication platform that is designed from the ground up to know absolutely nothing about you.</p>
          <p>Our philosophy is simple: If we do not collect data, we cannot lose it, sell it, or be forced to surrender it. Ghost Chat is a sanctuary for secure, temporary, and entirely anonymous communication. This Privacy Policy explains our spartan approach to data management, outlining precisely what we do—and more importantly, what we do not do—with your information.</p>

          <h2>2. Data We Do Not Collect</h2>
          <p>To understand our privacy model, it is crucial to understand what we actively avoid collecting. The vast majority of messaging applications require personal identifiers to create an account. Ghost Chat requires none of the following:</p>
          <ul>
            <li><strong>No Email Addresses:</strong> We do not ask for, nor do we store, your email address. You will never receive a marketing email or a newsletter from us.</li>
            <li><strong>No Phone Numbers:</strong> We do not require a phone number for SMS verification. Your identity remains completely untethered from your mobile device.</li>
            <li><strong>No Real Names:</strong> You are not required to provide your legal name or any personal identifiers.</li>
            <li><strong>No IP Address Logging:</strong> We do not maintain logs of the IP addresses used to access our service.</li>
            <li><strong>No Device Fingerprinting:</strong> We do not track your device ID, operating system, or browser type for analytics purposes.</li>
            <li><strong>No Location Data:</strong> We do not track, request, or store your GPS or network-based location.</li>
          </ul>

          <h2>3. Data We Actually Collect</h2>
          <p>Because Ghost Chat operates without personal identifiers, the data we collect is strictly limited to the cryptographic necessities required to facilitate secure communication between two anonymous parties. Here is the exhaustive list of data we store on our servers:</p>
          <ul>
            <li><strong>Username:</strong> A self-selected, non-identifying moniker you choose during account creation. This is public to the person you are communicating with.</li>
            <li><strong>Search Code:</strong> A randomly generated 6-digit numerical code used to facilitate connections between users. This code acts as your temporary address.</li>
            <li><strong>Password Hash:</strong> We do not store your password. We store a highly secure cryptographic hash of your password using industry-standard hashing algorithms. Even if our database were compromised, your password cannot be reverse-engineered from the hash.</li>
            <li><strong>Passphrase Hash:</strong> Similar to your password, we generate a 15-character passphrase for two-factor authentication. We store only the mathematical hash of this passphrase, not the passphrase itself.</li>
            <li><strong>Encrypted Messages:</strong> We temporarily store the encrypted text of the messages you send. These messages are tied only to anonymous search codes, not to personal identities.</li>
          </ul>

          <h2>4. The 24-Hour Auto-Deletion Mandate</h2>
          <p>Ghost Chat is not an archive. It is a real-time, temporary communication channel. We have implemented a strict, non-negotiable data retention policy that applies to all users across the platform.</p>
          <p><strong>Every single message sent through Ghost Chat is permanently and irretrievably deleted from our servers 24 hours after it is sent.</strong></p>
          <p>This process is automated via a server-side trigger. There are no backups of deleted messages. There are no hidden archives. Once the 24-hour window expires, the data is wiped from the primary database entirely. If you need to save information from a conversation, you must do so manually before the 24-hour period ends, as we cannot recover deleted messages under any circumstances.</p>

          <h2>5. No Tracking, No Analytics, No Ads</h2>
          <p>The modern web is plagued by invisible trackers. Ghost Chat is entirely free of them.</p>
          <p>We do not use Google Analytics, Meta Pixel, or any third-party analytics software to monitor your behavior on our application. We do not track how long you stay on a page, which buttons you click, or who you communicate with. Because we do not collect personal data, we have no data to sell to advertisers. Ghost Chat is completely ad-free. You are not the product; your privacy is.</p>

          <h2>6. Third-Party Service Providers</h2>
          <p>To operate Ghost Chat, we utilize secure third-party infrastructure. Specifically, our application is hosted on Vercel, and our temporary database is managed via Google Apps Script and Google Sheets. These providers are used strictly for hosting and real-time data processing. They are bound by their own stringent privacy and security protocols and do not have access to decrypt the cryptographic hashes that secure your account.</p>

          <h2>7. Your Rights and Data Control</h2>
          <p>Even though we do not know who you are, you retain full control over the anonymous identity you create. You have the right to abandon your account at any time. Because no personal data is tied to your account, "deleting" your account simply means destroying your passphrase and never logging in again. Without the passphrase and password, the account becomes an orphaned cryptograph, entirely inaccessible to anyone, including our administrators. Any lingering messages associated with the account will automatically be purged by our 24-hour deletion cycle.</p>

          <h2>8. Security Practices</h2>
          <p>We employ end-to-end encryption principles for data in transit. All communication between your browser and our servers is secured via HTTPS/TLS protocols. However, it is critical to understand that the security of your account relies entirely on your ability to keep your password and 15-character passphrase secret. Because we have no email addresses or phone numbers on file, <strong>we cannot reset your password or recover your account if you lose your credentials.</strong></p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>We reserve the right to update this Privacy Policy as our technology evolves. If we make material changes to how we handle data (which would only ever be in the direction of increasing privacy and security), we will post an update notification on the application dashboard. However, our core promise will never change: We will never collect your personal identity, and we will never sell your data.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions, concerns, or inquiries regarding this Privacy Policy or our security infrastructure, you may reach out to our administration team.</p>
          <p><strong>Email:</strong> privacy@ghostchat.local</p>
          <p><em>Note: Do not send your passphrase or password in any communication with us. Our team will never ask for your credentials.</em></p>
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

export default PrivacyPolicy;
