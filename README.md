# Anonymous Chat App

A complete, secure, 2-person anonymous web chat application with 24-hour auto-deleting messages.

## Tech Stack
- **Frontend**: React 18, Vite, Framer Motion, React Router.
- **Backend & Database**: Google Apps Script & Google Sheets.

## Features
- **3-Parameter Authentication**: Requires Username, Password, and a 15-character Cryptographic Passphrase (2FA).
- **Anonymous Search**: Users find each other using a unique 6-digit Search Code instead of usernames or phone numbers.
- **Auto-Deletion**: All messages are permanently deleted every 24 hours.

## Local Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure the Backend**
   Follow the detailed instructions in `backend/Schema.md` to:
   - Create your Google Sheet.
   - Install the Google Apps Script (`backend/Code.gs`).
   - Deploy the script as a Web App.
   - Set up the 24-hour time-driven trigger.

3. **Configure the Frontend Environment**
   - Rename `.env.example` to `.env`.
   - Replace the `VITE_API_URL` value with the Web App URL generated from your Google Apps Script deployment.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Usage
1. Open the app in your browser (usually `http://localhost:5173`).
2. Go to **Signup**, create an account, and **save the passphrase**.
3. Use the **Login** screen with your username, password, and passphrase.
4. On the **Dashboard**, your 6-digit code is visible in the Settings (gear icon).
5. Share your 6-digit code with a friend, or enter their code in the search bar to start an anonymous chat!
