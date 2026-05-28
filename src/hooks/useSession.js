import { encryptData, decryptData } from '../utils/crypto';

export const useSession = () => {
  const SESSION_KEY = 'anon_chat_session';

  const getSession = () => {
    const obfuscated = localStorage.getItem(SESSION_KEY);
    if (obfuscated) {
      try {
        const decoded = decryptData(obfuscated);
        return JSON.parse(decoded);
      } catch (e) {
        // Fallback for any existing plain text sessions
        return JSON.parse(obfuscated);
      }
    }
    return null;
  };

  const saveSession = (userData) => {
    const rawData = JSON.stringify({
      ...userData,
      loginTimestamp: new Date().toISOString()
    });
    const obfuscated = encryptData(rawData);
    localStorage.setItem(SESSION_KEY, obfuscated);
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };

  return { getSession, saveSession, clearSession };
};
