// Replace with your actual Google Apps Script Web App URL
const API_URL = import.meta.env.VITE_API_URL || 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

export const apiClient = {
  post: async (action, payload) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // GAS requires plain text or form data for CORS
        },
        body: JSON.stringify({ action, ...payload })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
