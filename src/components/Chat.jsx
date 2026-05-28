import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import '../styles/designTokens.css';

const Chat = ({ activeChat, messages, onSendMessage, session }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!activeChat) return (
    <div style={styles.emptyContainer}>
      <div style={styles.emptyIcon}>👻</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerUserInfo}>
          <div style={styles.pulseIndicator}></div>
          <h3 style={styles.headerTitle}>User #{activeChat.code}</h3>
        </div>
      </div>
      
      <div style={styles.messageList}>
        <AnimatePresence>
          {messages.map((msg, index) => {
            const isMe = msg.senderCode === session.searchCode;
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                key={msg.id || index} 
                style={{
                  ...styles.messageWrapper,
                  alignItems: isMe ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  ...styles.messageBubble,
                  background: isMe ? 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' : 'rgba(255, 255, 255, 0.1)',
                  color: isMe ? '#fff' : 'var(--text-primary)',
                  border: isMe ? 'none' : '1px solid var(--glass-border)'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  ...styles.messageTime,
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                }}>
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={styles.inputArea}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message" 
          className="glass-input"
          style={styles.input}
        />
        <button 
          type="submit" 
          className="glass-button"
          disabled={!newMessage.trim()}
          style={{...styles.sendButton, opacity: !newMessage.trim() ? 0.5 : 1}}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

const styles = {
  emptyContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'var(--fds-dark-mode-gray-50)',
  },
  emptyIcon: {
    fontSize: '60px',
    marginBottom: '20px',
    opacity: 0.8
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--text-primary)'
  },
  emptyText: {
    fontSize: '15px',
    opacity: 0.8
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    height: '100%',
  },
  header: {
    padding: '15px 20px',
    borderBottom: '1px solid var(--glass-border)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  headerUserInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  pulseIndicator: {
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--brand-accent)',
    borderRadius: '50%',
    boxShadow: '0 0 10px var(--brand-accent)',
    animation: 'pulse 2s infinite'
  },
  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  messageList: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    width: '100%',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    lineHeight: '1.4',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },
  messageTime: {
    fontSize: '11px',
    color: 'var(--text-tertiary)',
    marginTop: '4px',
    marginRight: '4px',
    marginLeft: '4px'
  },
  inputArea: {
    padding: '15px 20px',
    borderTop: '1px solid var(--glass-border)',
    display: 'flex',
    gap: '10px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: '15px',
    padding: '10px',
  },
  sendButton: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
  }
};

export default Chat;
