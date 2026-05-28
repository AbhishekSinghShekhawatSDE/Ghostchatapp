import React from 'react';
import { motion } from 'framer-motion';
import '../styles/designTokens.css';

const Inbox = ({ conversations, activeChat, onSelectChat }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Messages</h2>
      {conversations.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>👻</div>
          <p>No conversations yet.</p>
          <span>Use the search bar to find someone!</span>
        </div>
      ) : (
        <div style={styles.list}>
          {conversations.map((chat, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={chat.code} 
              onClick={() => onSelectChat(chat)}
              style={{
                ...styles.chatItem,
                backgroundColor: activeChat?.code === chat.code ? 'rgba(10, 132, 255, 0.15)' : 'transparent',
                borderLeft: activeChat?.code === chat.code ? '3px solid var(--brand-primary)' : '3px solid transparent'
              }}
            >
              <div style={styles.avatar}>
                {chat.code.substring(0,2)}
              </div>
              <div style={styles.chatInfo}>
                <div style={styles.chatName}>User #{chat.code}</div>
                <div style={styles.lastMessage}>{chat.lastMessage || 'New conversation'}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'transparent'
  },
  header: {
    padding: '20px',
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    borderBottom: '1px solid var(--glass-border)',
    color: 'var(--text-primary)'
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: '10px'
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '2px',
  },
  avatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '15px',
    boxShadow: '0 4px 10px rgba(10, 132, 255, 0.3)'
  },
  chatInfo: {
    flex: 1,
    overflow: 'hidden'
  },
  chatName: {
    fontWeight: '600',
    fontSize: '15px',
    marginBottom: '4px',
    color: 'var(--text-primary)'
  },
  lastMessage: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
    color: 'var(--fds-dark-mode-gray-50)',
    fontSize: '14px',
    opacity: 0.7,
  },
  emptyIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  }
};

export default Inbox;
