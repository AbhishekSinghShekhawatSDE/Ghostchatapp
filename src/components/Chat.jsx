import React, { useState } from 'react';
import { Send } from 'lucide-react';
import '../styles/designTokens.css';

const Chat = ({ activeChat, messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  if (!activeChat) return (
    <div style={styles.emptyContainer}>
      <div style={styles.emptyIcon}>💬</div>
      <h3 style={styles.emptyTitle}>Your Messages</h3>
      <p style={styles.emptyText}>Select a conversation from the sidebar or start a new one.</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerInfo}>
          <div style={styles.avatar}>{activeChat.code.substring(0,2)}</div>
          <span style={styles.headerName}>User #{activeChat.code}</span>
        </div>
      </div>
      
      <div style={styles.messageList}>
        {messages.map(msg => (
          <div 
            key={msg.id} 
            style={{
              ...styles.messageWrapper, 
              justifyContent: msg.isOwn ? 'flex-end' : 'flex-start'
            }}
          >
            <div 
              style={{
                ...styles.messageBubble,
                backgroundColor: msg.isOwn ? 'var(--fds-blue-60)' : 'var(--fds-comment-background)',
                color: msg.isOwn ? '#fff' : 'var(--text-primary)',
                borderBottomRightRadius: msg.isOwn ? '4px' : '18px',
                borderBottomLeftRadius: !msg.isOwn ? '4px' : '18px',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} style={styles.inputArea}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message..."
          style={styles.textInput}
        />
        <button type="submit" style={styles.sendButton} disabled={!inputText.trim()}>
          <Send size={20} color={inputText.trim() ? 'var(--fds-blue-60)' : 'var(--fds-dark-mode-gray-50)'} />
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
    backgroundColor: 'var(--bg-surface)',
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
    backgroundColor: 'var(--bg-surface)'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid rgba(17, 17, 18, 0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: 'var(--fds-dark-mode-gray-35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '12px',
    fontSize: '12px'
  },
  headerName: {
    fontWeight: '600',
    fontSize: '16px'
  },
  messageList: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageWrapper: {
    display: 'flex',
    width: '100%'
  },
  messageBubble: {
    padding: '10px 15px',
    borderRadius: '18px',
    maxWidth: '70%',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  inputArea: {
    padding: '20px',
    borderTop: '1px solid rgba(17, 17, 18, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  textInput: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--fds-dark-mode-gray-35)',
    backgroundColor: '#FAFAFA',
    fontSize: '14px',
    outline: 'none'
  },
  sendButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Chat;
