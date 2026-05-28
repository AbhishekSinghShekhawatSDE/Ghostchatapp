import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import SearchBar from '../components/SearchBar';
import Inbox from '../components/Inbox';
import Chat from '../components/Chat';
import Settings from '../components/Settings';
import OnboardingModal from '../components/OnboardingModal';
import '../styles/designTokens.css';

const Dashboard = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  
  // Initialize chat hook with the current session
  const { 
    conversations, 
    activeChat, 
    messages, 
    selectChat, 
    sendMessage, 
    searchUser, 
    loading 
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
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.logo}>AnonChat</h1>
        </div>
        
        <div style={styles.headerCenter}>
          <SearchBar onSearch={searchUser} loading={loading} />
        </div>
        
        <div style={styles.headerRight}>
          <Settings session={session} />
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.main}>
        <Inbox 
          conversations={conversations} 
          activeChat={activeChat} 
          onSelectChat={selectChat} 
        />
        <Chat 
          activeChat={activeChat} 
          messages={messages} 
          onSendMessage={sendMessage} 
        />
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-primary)'
  },
  header: {
    height: '64px',
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid rgba(17, 17, 18, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    zIndex: 10
  },
  headerLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    margin: 0,
    fontFamily: 'cursive',
    fontSize: '20px',
    color: 'var(--fds-black)'
  },
  headerCenter: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center'
  },
  headerRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  }
};

export default Dashboard;
