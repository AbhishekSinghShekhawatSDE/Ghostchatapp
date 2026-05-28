# Google Sheets Database Schema

To set up the backend database for the Anonymous Chat App, you need to create a new Google Sheet and configure it as follows.

## 1. Create the Google Sheet
1. Go to Google Sheets and create a new blank spreadsheet.
2. Name it "AnonymousChatDB".

## 2. Setup the "Users" Sheet
Rename the first tab at the bottom to `Users`. Add the following headers in Row 1:
- A1: `Timestamp`
- B1: `Username`
- C1: `PasswordHash`
- D1: `PassphraseHash`
- E1: `SearchCode`
- F1: `Status`

## 3. Setup the "Messages" Sheet
Click the `+` button at the bottom to add a new sheet. Rename it to `Messages`. Add the following headers in Row 1:
- A1: `Timestamp`
- B1: `SenderCode`
- C1: `ReceiverCode`
- D1: `EncryptedMessage`

## 4. Setup the "Sessions" Sheet
Click the `+` button at the bottom to add a new sheet. Rename it to `Sessions`. Add the following headers in Row 1:
- A1: `UserCode`
- B1: `LoginTimestamp`
- C1: `LastActivity`

## 5. Install Google Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Delete any existing code in the `Code.gs` file.
3. Paste the contents of the local `backend/Code.gs` file into the editor.
4. Save the file (Ctrl+S or Cmd+S).
5. Run the `setupSheet` function manually once to ensure permissions are granted.

## 6. Deploy as Web App
1. Click the **Deploy** button in the top right corner.
2. Select **New deployment**.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Set a description (e.g., "Initial API").
5. Under "Execute as", select **Me**.
6. Under "Who has access", select **Anyone**.
7. Click **Deploy**.
8. **Copy the generated Web app URL**. You will need to put this URL into your React application so the frontend can talk to the backend.

## 7. Setup Auto-Deletion (Time-driven Trigger)
To ensure messages delete after 24 hours:
1. In the Apps Script editor, click the **Triggers** icon (clock) on the left sidebar.
2. Click **Add Trigger** (bottom right).
3. Set the following:
   - Choose which function to run: `deleteOldMessages`
   - Select event source: `Time-driven`
   - Select type of time based trigger: `Day timer`
   - Select time of day: `Midnight to 1am` (or any preferred time)
4. Click **Save**.
