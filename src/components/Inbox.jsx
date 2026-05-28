import React from 'react';
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
          {conversations.map(chat => (
            <div 
              key={chat.code} 
              onClick={() => onSelectChat(chat)}
              style={{
                ...styles.chatItem,
                backgroundColor: activeChat?.code === chat.code ? 'var(--fds-blue-05)' : 'transparent'
              }}
            >
              <div style={styles.avatar}>
                {chat.code.substring(0,2)}
              </div>
              <div style={styles.chatInfo}>
                <div style={styles.chatName}>User #{chat.code}</div>
                <div style={styles.lastMessage}>{chat.lastMessage || 'New conversation'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    borderRight: '1px solid rgba(17, 17, 18, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--bg-surface)'
  },
  header: {
    padding: '20px',
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    borderBottom: '1px solid rgba(17, 17, 18, 0.1)'
  },
  list: {
    flex: 1,
    overflowY: 'auto'
  },
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(17, 17, 18, 0.05)',
    transition: 'background-color 0.2s'
  },
  avatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'var(--fds-dark-mode-gray-35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '15px'
  },
  chatInfo: {
    flex: 1,
    overflow: 'hidden'
  },
  chatName: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '4px'
  },
  lastMessage: {
    fontSize: '13px',
    color: 'var(--fds-dark-mode-gray-50)',
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
