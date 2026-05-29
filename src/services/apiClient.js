// Replace with your actual Google Apps Script Web App URL
const API_URL = import.meta.env.VITE_API_URL || 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

export const apiClient = {
  post: async (action, payload, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', // GAS requires plain text or form data for CORS
          },
          body: JSON.stringify({ action, ...payload })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`API Error on attempt ${i + 1}:`, error);
        if (i === retries) {
          throw error;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }
};
