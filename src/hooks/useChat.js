import { useState, useEffect, useRef } from 'react';
import { apiClient } from '../services/apiClient';

export const useChat = (session) => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Persist to and load from encrypted localStorage
  useEffect(() => {
    try {
      const savedMsgs = localStorage.getItem('anon_chat_messages');
      if (savedMsgs) {
        const parsedMsgs = JSON.parse(decodeURIComponent(atob(savedMsgs)));
        const validMsgs = parsedMsgs.filter(m => new Date(m.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000);
        setMessages(validMsgs);
      }
      const savedConvos = localStorage.getItem('anon_chat_convos');
      if (savedConvos) setConversations(JSON.parse(decodeURIComponent(atob(savedConvos))));
    } catch (e) { console.error('Failed to decode local storage', e); }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('anon_chat_messages', btoa(encodeURIComponent(JSON.stringify(messages))));
    }
  }, [messages]);

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('anon_chat_convos', btoa(encodeURIComponent(JSON.stringify(conversations))));
    }
  }, [conversations]);
  
  // Use ref to keep track of last sync time across renders without triggering effects
  const lastSyncTime = useRef(0);

  // Poll for messages
  useEffect(() => {
    if (!session || !activeChat) return;

    let isMounted = true;
    
    const fetchMessages = async () => {
      try {
        const res = await apiClient.post('getMessages', {
          senderCode: session.searchCode,
          receiverCode: activeChat.code,
          lastSyncTime: lastSyncTime.current
        });

        if (isMounted && res.success && res.messages.length > 0) {
          const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
          const validMessages = res.messages.filter(m => new Date(m.timestamp).getTime() > twentyFourHoursAgo);
          
          if (validMessages.length > 0) {
            lastSyncTime.current = Math.max(...validMessages.map(m => new Date(m.timestamp).getTime()));
            setMessages(prev => {
              const all = [...prev, ...validMessages];
              return all.filter(m => new Date(m.timestamp).getTime() > twentyFourHoursAgo);
            });
          }
        }
      } catch (err) {
        console.error("Error polling messages", err);
      }
    };

    // Initial fetch when chat changes
    lastSyncTime.current = 0; // Reset sync time for new chat
    setMessages([]); // Clear messages
    fetchMessages();

    // Poll every 3 seconds
    const interval = setInterval(fetchMessages, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [session, activeChat]);

  const selectChat = (chat) => {
    setActiveChat(chat);
  };

  const sendMessage = async (text) => {
    if (!activeChat || !text.trim()) return;
    
    // Optimistic UI update
    const newMsg = {
      id: Date.now().toString() + '-optimistic',
      sender: session.searchCode,
      receiver: activeChat.code,
      text: text,
      isOwn: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMsg]);

    try {
      await apiClient.post('sendMessage', {
        senderCode: session.searchCode,
        receiverCode: activeChat.code,
        messageText: text
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const searchUser = async (code) => {
    setLoading(true);
    try {
      const res = await apiClient.post('search', { searchCode: code });
      
      if (res.success) {
        // Check if conversation already exists
        const exists = conversations.find(c => c.code === code);
        if (!exists) {
          const newChat = { id: Date.now().toString(), code: code, username: res.username, lastMessage: '' };
          setConversations(prev => [newChat, ...prev]);
          selectChat(newChat);
        } else {
          selectChat(exists);
        }
      } else {
        alert(res.error || 'User not found');
      }
    } catch (err) {
      console.error("Search failed", err);
      alert('Search failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return { conversations, activeChat, messages, selectChat, sendMessage, searchUser, loading };
};
