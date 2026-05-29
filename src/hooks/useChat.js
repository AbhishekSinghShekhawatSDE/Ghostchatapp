import { useState, useEffect, useRef } from 'react';
import { apiClient } from '../services/apiClient';
import { generateBotResponse } from '../utils/bots';

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
      if (savedConvos) {
        const parsedConvos = JSON.parse(decodeURIComponent(atob(savedConvos)));
        // 2-hour buffer: 24hrs for messages + 2hrs buffer = 26 hours total retention without activity
        const validConvos = parsedConvos.filter(c => {
          if (!c.lastActivity) return true; // keep newly created
          return Date.now() - c.lastActivity < 26 * 60 * 60 * 1000;
        });
        setConversations(validConvos);
      }
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
            
            // Update lastActivity for this chat
            setConversations(prev => prev.map(c => 
              c.code === activeChat.code 
                ? { ...c, lastActivity: Date.now(), lastMessage: validMessages[validMessages.length - 1].text }
                : c
            ));
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

    // Update last activity
    setConversations(prev => prev.map(c => 
      c.code === activeChat.code 
        ? { ...c, lastActivity: Date.now(), lastMessage: text }
        : c
    ));

    // Handle bot response interception
    if (activeChat.code.startsWith('bot_')) {
      const { text: botText, delay } = generateBotResponse(activeChat.code, text);
      
      setTimeout(() => {
        const botMsg = {
          id: Date.now().toString() + '-bot',
          sender: activeChat.code,
          receiver: session.searchCode,
          text: botText,
          isOwn: false,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, botMsg]);
        setConversations(prev => prev.map(c => 
          c.code === activeChat.code 
            ? { ...c, lastActivity: Date.now(), lastMessage: botText }
            : c
        ));
      }, delay);
      
      return; // Do not send bot messages to the backend
    }

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

  const addConversation = (code, username) => {
    const exists = conversations.find(c => c.code === code);
    if (!exists) {
      const newChat = { 
        id: Date.now().toString(), 
        code: code, 
        username: username, 
        lastMessage: '',
        lastActivity: Date.now()
      };
      setConversations(prev => [newChat, ...prev]);
      selectChat(newChat);
    } else {
      selectChat(exists);
    }
  };

  const deleteConversation = (code) => {
    setConversations(prev => prev.filter(c => c.code !== code));
    if (activeChat?.code === code) {
      selectChat(null);
    }
    // Also remove local messages associated with this chat to free space
    setMessages(prev => prev.filter(m => !(m.sender === code || m.receiver === code)));
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
          return newChat;
        } else {
          selectChat(exists);
          return exists;
        }
      } else {
        alert(res.error || 'User not found');
        return null;
      }
    } catch (err) {
      console.error("Search failed", err);
      alert('Search failed. Please check your connection.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendDirectMessage = async (receiverCode, text) => {
    if (!text.trim()) return;
    
    const newMsg = {
      id: Date.now().toString() + '-optimistic',
      sender: session.searchCode,
      receiver: receiverCode,
      text: text,
      isOwn: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMsg]);

    setConversations(prev => prev.map(c => 
      c.code === receiverCode 
        ? { ...c, lastActivity: Date.now(), lastMessage: text }
        : c
    ));

    try {
      await apiClient.post('sendMessage', {
        senderCode: session.searchCode,
        receiverCode: receiverCode,
        messageText: text
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return { conversations, activeChat, messages, selectChat, sendMessage, sendDirectMessage, searchUser, loading, addConversation, deleteConversation };
};
