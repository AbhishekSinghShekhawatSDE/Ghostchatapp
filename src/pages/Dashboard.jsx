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
    <div className="dashboard-layout">
      <OnboardingModal />
      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card dashboard-header"
      >
        <div className="dashboard-header-left">
          <h1 style={styles.logo}>Ghost Chat</h1>
        </div>
        
        <div className="dashboard-header-center">
          <SearchBar onSearch={handleSearch} loading={searchLoading} />
        </div>
        
        <div className="dashboard-header-right">
          <Settings session={session} />
        </div>
      </motion.header>

      {/* Main Content Area */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="dashboard-main"
      >
        <div className="glass-card dashboard-sidebar">
          <Inbox 
            conversations={conversations} 
            activeChat={activeChat} 
            onSelectChat={setActiveChat} 
          />
        </div>
        
        <div className="glass-card dashboard-chat-area">
          <Chat 
            activeChat={activeChat} 
            messages={messages} 
            onSendMessage={sendMessage} 
            session={session}
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
  dashboardFooter: {
    flexShrink: 0,
    transform: 'scale(0.85)',
    transformOrigin: 'bottom center',
    marginTop: '-20px',
    marginBottom: '-10px'
  }
};

export default Dashboard;
