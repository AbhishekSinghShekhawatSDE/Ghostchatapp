export const useSession = () => {
  const SESSION_KEY = 'anon_chat_session';

  const getSession = () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  };

  const saveSession = (userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      ...userData,
      loginTimestamp: new Date().toISOString()
    }));
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };

  return { getSession, saveSession, clearSession };
};
