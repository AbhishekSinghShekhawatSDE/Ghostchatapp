import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import '../styles/designTokens.css';

const Inbox = ({ conversations, activeChat, onSelectChat, onDeleteChat, session }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Messages</h2>
      {conversations.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>👻</div>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '5px', fontSize: '16px' }}>Ready to chat?</p>
          <span style={{ marginBottom: '20px', lineHeight: '1.4' }}>Ask your partner for their 6-digit code to start messaging.</span>
          
          <div style={styles.codeBox}>
            <span style={styles.codeLabel}>Your Search Code:</span>
            <div style={styles.codeFlex}>
              <span style={styles.codeText}>{session?.searchCode || '------'}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(session?.searchCode);
                  alert('Code copied to clipboard!');
                }}
                style={styles.copyBtn}
                title="Copy Code"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.list}>
          {conversations.map((chat, i) => {
            const isExpired = chat.lastActivity && (Date.now() - chat.lastActivity > 24 * 60 * 60 * 1000);
            
            return (
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
                  <div style={styles.chatName}>{chat.username ? `@${chat.username}` : `User #${chat.code}`}</div>
                  <div style={styles.lastMessage}>
                    {isExpired ? (
                      <span style={{color: 'var(--brand-warning)'}}>Chat ended. Start new conversation?</span>
                    ) : (
                      chat.lastMessage || 'New conversation'
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.code);
                  }}
                  style={styles.deleteBtn}
                  title="Delete Chat"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            );
          })}
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
  },
  codeBox: {
    padding: '15px', 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    borderRadius: '8px', 
    border: '1px solid var(--glass-border)', 
    width: '100%', 
    maxWidth: '250px',
    textAlign: 'left'
  },
  codeLabel: {
    fontSize: '12px', 
    color: 'var(--text-secondary)', 
    display: 'block', 
    marginBottom: '8px'
  },
  codeFlex: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  codeText: {
    fontFamily: 'monospace', 
    fontSize: '18px', 
    fontWeight: 'bold', 
    color: 'var(--brand-primary)', 
    letterSpacing: '2px'
  },
  copyBtn: {
    background: 'rgba(255,255,255,0.1)', 
    border: 'none', 
    cursor: 'pointer', 
    color: 'var(--text-primary)', 
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'background 0.2s'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transition: 'opacity 0.2s, color 0.2s',
  }
};

// Add hover effect via pure CSS since inline styles don't support pseudo-classes easily
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  button[title="Delete Chat"]:hover {
    opacity: 1 !important;
    color: var(--brand-error) !important;
  }
`;
document.head.appendChild(styleTag);

export default Inbox;
