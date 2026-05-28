import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import SearchBar from '../components/SearchBar';
import Inbox from '../components/Inbox';
import Chat from '../components/Chat';
import Settings from '../components/Settings';
import OnboardingModal from '../components/OnboardingModal';
import Footer from '../components/Footer';
import '../styles/designTokens.css';

const Dashboard = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  
  // Initialize chat hook with the current session
  const { 
    conversations, 
    activeChat, 
    messages, 
    selectChat: setActiveChat, 
    sendMessage, 
    searchUser: handleSearch, 
    loading: searchLoading 
  } = useChat(session);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div style={styles.layout}>
      <OnboardingModal />
      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={styles.header}
      >
        <div style={styles.headerLeft}>
          <h1 style={styles.logo}>AnonymousChat</h1>
        </div>
        
        <div style={styles.headerCenter}>
          <SearchBar onSearch={handleSearch} loading={searchLoading} />
        </div>
        
        <div style={styles.headerRight}>
          <Settings session={session} />
        </div>
      </motion.header>

      {/* Main Content Area */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={styles.mainContent}
      >
        <div className="glass-card" style={styles.sidebar}>
          <Inbox 
            conversations={conversations} 
            activeChat={activeChat} 
            onSelectChat={setActiveChat} 
          />
        </div>
        
        <div className="glass-card" style={styles.chatArea}>
          <Chat 
            activeChat={activeChat} 
            messages={messages} 
            onSendMessage={sendMessage} 
          />
        </div>
      </motion.main>
      <div style={styles.dashboardFooter}>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    padding: '20px',
    boxSizing: 'border-box',
    gap: '20px',
    backgroundColor: 'var(--bg-primary)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '70px',
    flexShrink: 0,
    border: 'none',
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    fontSize: '22px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '800',
    letterSpacing: '-1px',
    margin: 0,
    background: 'linear-gradient(135deg, #fff, #AEAEB2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    gap: '20px',
    overflow: 'hidden',
  },
  sidebar: {
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    overflow: 'hidden',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    overflow: 'hidden',
  },
  dashboardFooter: {
    flexShrink: 0,
    transform: 'scale(0.85)',
    transformOrigin: 'bottom center',
    marginTop: '-20px',
    marginBottom: '-10px'
  }
};

export default Dashboard;
