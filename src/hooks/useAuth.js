import { useState } from 'react';
import { useSession } from './useSession';
import { apiClient } from '../services/apiClient';
import { hashString } from '../utils/crypto';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { saveSession, getSession, clearSession } = useSession();

  const login = async (username, password, passphrase) => {
    setLoading(true);
    setError(null);
    try {
      const passwordHash = await hashString(password);
      const passphraseHash = await hashString(passphrase);
      
      const res = await apiClient.post('login', { username, passwordHash, passphraseHash });
      
      if (res.error) {
        throw new Error(res.error);
      }
      
      saveSession({
        username: res.username,
        passphrase,
        searchCode: res.searchCode
      });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  return { login, logout, loading, error, session: getSession() };
};
