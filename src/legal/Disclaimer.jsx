import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Disclaimer = () => {
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
          <h1 style={styles.title}>Ghost Chat Disclaimer</h1>
          <p style={styles.tagline}>Anonymous. Secure. Temporary.</p>
        </div>
        
        <div style={styles.content}>
          <h2>1. Experimental Technology Warning</h2>
          <p>Ghost Chat is an experimental communication platform built to explore decentralized anonymity concepts. The application relies on complex cryptographic hashing algorithms, local storage protocols, and automated server-side deletion mechanisms. While we strive to maintain the highest standards of security and uptime, the service is fundamentally experimental. We make no guarantees that the application will function without interruption or error.</p>

          <h2>2. No Warranties</h2>
          <p>THIS SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. WE EXPLICITLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE DO NOT GUARANTEE THAT ANY MESSAGES YOU SEND WILL BE DELIVERED, OR THAT THEY WILL BE RETAINED FOR EXACTLY 24 HOURS BEFORE AUTOMATED DELETION.</p>

          <h2>3. User Responsibility for Data Loss</h2>
          <p>Because Ghost Chat operates without an email recovery system or standard centralized account management, the total burden of account recovery lies with you. If you lose your 15-character passphrase or your password, your account is permanently lost. You acknowledge that Ghost Chat, its developers, and its administrators cannot retrieve your account, reset your password, or recover your messages under any circumstances. We bear no liability for your lost data, missed communications, or locked accounts.</p>

          <h2>4. Accuracy and Security Limitations</h2>
          <p>We do not guarantee absolute security against advanced cryptographic attacks, state-sponsored interception, or zero-day exploits targeting the underlying server infrastructure (e.g., Vercel, Google Apps Script). While we use industry-standard encryption protocols (HTTPS/TLS) and hashing algorithms (SHA-256), no system is entirely impenetrable. If you require military-grade, air-gapped security for life-or-death communications, you should not rely solely on a web-based chat application.</p>

          <h2>5. Third-Party Services Integration</h2>
          <p>Ghost Chat utilizes third-party infrastructure for hosting and database management. We are not responsible for outages, data breaches, or policy changes enacted by these third-party vendors. Any limitations or disruptions in their service will inherently affect Ghost Chat's availability.</p>

          <h2>6. Limitation of Damages</h2>
          <p>Under no circumstances shall Ghost Chat or its creators be held liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the service. By continuing to use Ghost Chat, you waive your right to pursue legal action against the platform for damages resulting from technical failures or data loss.</p>
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
  }
};

export default Disclaimer;
