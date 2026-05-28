/**
 * backend/Code.gs
 * Complete Backend for Anonymous Chat App
 */

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Users Sheet
  let usersSheet = ss.getSheetByName('Users');
  if (!usersSheet) {
    usersSheet = ss.insertSheet('Users');
    usersSheet.appendRow(['Timestamp', 'Username', 'PasswordHash', 'PassphraseHash', 'SearchCode', 'Status']);
    usersSheet.setFrozenRows(1);
  }

  // Messages Sheet
  let msgsSheet = ss.getSheetByName('Messages');
  if (!msgsSheet) {
    msgsSheet = ss.insertSheet('Messages');
    msgsSheet.appendRow(['Timestamp', 'SenderCode', 'ReceiverCode', 'EncryptedMessage']);
    msgsSheet.setFrozenRows(1);
  }

  // Sessions Sheet
  let sessionsSheet = ss.getSheetByName('Sessions');
  if (!sessionsSheet) {
    sessionsSheet = ss.insertSheet('Sessions');
    sessionsSheet.appendRow(['UserCode', 'LoginTimestamp', 'LastActivity']);
    sessionsSheet.setFrozenRows(1);
  }

  // DeletedMessages Sheet (Audit)
  let deletedSheet = ss.getSheetByName('DeletedMessages');
  if (!deletedSheet) {
    deletedSheet = ss.insertSheet('DeletedMessages');
    deletedSheet.appendRow(['OriginalTimestamp', 'DeletedTimestamp', 'SenderCode', 'ReceiverCode', 'MessageLength']);
    deletedSheet.setFrozenRows(1);
  }

  // Logs Sheet
  let logsSheet = ss.getSheetByName('Logs');
  if (!logsSheet) {
    logsSheet = ss.insertSheet('Logs');
    logsSheet.appendRow(['Timestamp', 'Action', 'Details']);
    logsSheet.setFrozenRows(1);
  }
}

// Simple text response for CORS
function sendResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Generate random string
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate 6 digit code
function generateSearchCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Load CryptoJS dynamically
var window = this;
var CryptoJS;
function loadCryptoJS() {
  if (typeof CryptoJS === 'undefined') {
    const url = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
    const script = UrlFetchApp.fetch(url).getContentText();
    eval(script);
  }
}

const SECRET_KEY = 'GHOST_CHAT_SHARED_SECRET_KEY';

function decryptPassword(encryptedBlob) {
  if (!encryptedBlob) return '';
  loadCryptoJS();
  const bytes = CryptoJS.AES.decrypt(encryptedBlob, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    logAction('API_CALL', action);

    if (action === 'register') return registerUser(data);
    if (action === 'login') return loginUser(data);
    if (action === 'search') return searchUser(data);
    if (action === 'sendMessage') return sendMessage(data);
    if (action === 'getMessages') return getMessages(data);

    return sendResponse({ error: 'Invalid action' });
  } catch (error) {
    logAction('ERROR', error.toString());
    return sendResponse({ error: error.toString() });
  }
}

function logAction(action, details) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs');
  if (sheet) {
    sheet.appendRow([new Date().toISOString(), action, details]);
  }
}

function registerUser(data) {
  const { username, encryptedPassword } = data;
  const plainPassword = decryptPassword(encryptedPassword);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  
  // Check if username exists
  const dataRange = sheet.getDataRange().getValues();
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][1] === username) {
      return sendResponse({ error: 'Username already exists' });
    }
  }

  const searchCode = generateSearchCode();
  const passphrase = generateRandomString(15);
  
  // Store all data as plain text without backend hashing
  sheet.appendRow([new Date().toISOString(), username, plainPassword, passphrase, searchCode, 'Active']);
  
  return sendResponse({ 
    success: true, 
    searchCode: searchCode,
    passphrase: passphrase 
  });
}

function loginUser(data) {
  const { username, encryptedPassword, passphrase } = data;
  const plainPassword = decryptPassword(encryptedPassword);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (row[1] === username) {
      if (row[2] === plainPassword && row[3] === passphrase) {
        
        const sessionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sessions');
        sessionSheet.appendRow([row[4], new Date().toISOString(), new Date().toISOString()]);
        
        return sendResponse({ 
          success: true, 
          username: row[1],
          searchCode: row[4] 
        });
      } else {
        return sendResponse({ error: 'Invalid password or passphrase' });
      }
    }
  }
  return sendResponse({ error: 'User not found' });
}

function searchUser(data) {
  const { searchCode } = data;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');
  const values = sheet.getDataRange().getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][4] === searchCode) {
      return sendResponse({ success: true, code: searchCode, username: values[i][1] });
    }
  }
  return sendResponse({ error: 'User not found' });
}

function sendMessage(data) {
  const { senderCode, receiverCode, messageText } = data;
  // Basic sanitization
  const safeText = messageText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
  sheet.appendRow([new Date().toISOString(), senderCode, receiverCode, safeText]);
  return sendResponse({ success: true });
}

function getMessages(data) {
  const { senderCode, receiverCode, lastSyncTime } = data;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
  
  if (sheet.getLastRow() <= 1) {
    return sendResponse({ success: true, messages: [] });
  }

  const values = sheet.getDataRange().getValues();
  const newMessages = [];
  
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const msgTime = new Date(row[0]).getTime();
    
    const isRelevant = (row[1] === senderCode && row[2] === receiverCode) || 
                       (row[1] === receiverCode && row[2] === senderCode);
    
    if (isRelevant && (!lastSyncTime || msgTime > lastSyncTime)) {
      newMessages.push({
        id: msgTime + '-' + row[1],
        timestamp: row[0],
        sender: row[1],
        receiver: row[2],
        text: row[3],
        isOwn: row[1] === senderCode
      });
    }
  }
  return sendResponse({ success: true, messages: newMessages });
}

// Automatically runs every 24 hours (Configure via Apps Script Triggers)
function deleteOldMessages() {
  const msgSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
  const deletedSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DeletedMessages');
  if (!msgSheet || !deletedSheet) return;

  const now = new Date().getTime();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  const data = msgSheet.getDataRange().getValues();
  // Traverse backwards
  for (let i = data.length - 1; i > 0; i--) {
    const timestamp = new Date(data[i][0]).getTime();
    if (now - timestamp > ONE_DAY) {
      // Archive to deleted sheet for audit (length of message only to preserve privacy)
      const msgLen = String(data[i][3]).length;
      deletedSheet.appendRow([data[i][0], new Date().toISOString(), data[i][1], data[i][2], msgLen]);
      // Delete from active messages
      msgSheet.deleteRow(i + 1); 
    }
  }
}
