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
import SuggestionBox from '../components/SuggestionBox';
import { generateDynamicBots } from '../utils/bots';
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
    sendDirectMessage,
    searchUser: handleSearch, 
    loading: searchLoading,
    addConversation,
    deleteConversation
  } = useChat(session);

  const [dynamicBots, setDynamicBots] = useState([]);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }
    
    // Generate dynamic bots once per session
    setDynamicBots(generateDynamicBots(session.username));

    const refCode = sessionStorage.getItem('referral_code');
    if (refCode) {
      sessionStorage.removeItem('referral_code');
      // Adding a small delay to ensure chat initializes
      setTimeout(() => {
        handleSearch(refCode).then((chat) => {
          if (chat) {
            setTimeout(() => {
              sendDirectMessage(chat.code, "Hi, just joined!");
            }, 500);
          }
        });
      }, 500);
    }
  }, [session, navigate]);

  const handleSelectBot = (bot) => {
    addConversation(bot.code, bot.username);
  };

  if (!session) return null;

  return (
    <div className="dashboard-layout">
      <OnboardingModal />
      <SuggestionBox 
        visible={conversations.length === 0} 
        onSelectBot={handleSelectBot} 
        bots={dynamicBots}
      />
      {/* Top Navigation Bar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card dashboard-header"
      >
        <div className="dashboard-header-left">
          <h1 className="dashboard-logo">Ghost Chat</h1>
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
        <div className={`glass-card dashboard-sidebar ${!activeChat ? 'full-height-mobile' : ''}`}>
          <Inbox 
            conversations={conversations} 
            activeChat={activeChat} 
            onSelectChat={setActiveChat} 
            onDeleteChat={deleteConversation}
            session={session}
          />
        </div>
        
        <div className={`glass-card dashboard-chat-area ${!activeChat ? 'hide-on-mobile' : ''}`}>
          <Chat 
            activeChat={activeChat} 
            messages={messages} 
            onSendMessage={sendMessage} 
            session={session}
          />
        </div>
      </motion.main>
    </div>
  );
};

const styles = {};

export default Dashboard;
