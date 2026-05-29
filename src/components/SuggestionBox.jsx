import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';
import '../styles/designTokens.css';

const SuggestionBox = ({ onSelectBot, visible, bots = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!visible && !isOpen) return null;

  return (
    <>
      {!isOpen && visible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="suggestion-trigger"
          onClick={() => setIsOpen(true)}
          style={styles.triggerContainer}
        >
          <motion.button
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={styles.triggerBtn}
            className="glass-card"
          >
            <span style={{ fontSize: '16px' }}>👋</span>
            Feeling lonely? Find new people to talk to!
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <div style={styles.modalOverlay}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-card"
              style={styles.modal}
            >
              <div style={styles.header}>
                <h3 style={styles.title}>Suggested People</h3>
                <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                  <X size={20} />
                </button>
              </div>

              <div style={styles.list}>
                {bots.map((bot) => (
                  <div key={bot.id} style={styles.card} className="glass-card">
                    <div style={styles.avatar}>{bot.avatar}</div>
                    <div style={styles.info}>
                      <div style={styles.name}>{bot.username}</div>
                      <div style={styles.bio}>{bot.bio}</div>
                      <div style={styles.tags}>
                        {bot.personality.split(',').map(tag => (
                          <span key={tag} style={styles.tag}>{tag.trim()}</span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectBot(bot);
                        setIsOpen(false);
                      }}
                      style={styles.chatBtn}
                      className="glass-button"
                    >
                      <UserPlus size={16} />
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  triggerContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
  },
  triggerBtn: {
    padding: '12px 24px',
    borderRadius: '30px',
    border: '1px solid rgba(10, 132, 255, 0.5)',
    background: 'rgba(10, 132, 255, 0.15)',
    color: 'var(--brand-primary)',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 20px rgba(10, 132, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '18px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '4px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    gap: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  avatar: {
    fontSize: '32px',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '50%',
  },
  info: {
    flex: 1,
    overflow: 'hidden',
  },
  name: {
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    fontSize: '15px',
    marginBottom: '4px',
  },
  bio: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tags: {
    display: 'flex',
    gap: '6px',
  },
  tag: {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    color: 'var(--brand-primary)',
  },
  chatBtn: {
    padding: '8px 12px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: 'auto',
  }
};

export default SuggestionBox;
