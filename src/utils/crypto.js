import CryptoJS from 'crypto-js';

const SECRET_KEY = 'GHOST_CHAT_SHARED_SECRET_KEY';

export function encryptData(data) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Generate a random string of given length
export function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  for (let i = 0; i < length; i++) {
    result += chars[randomArray[i] % chars.length];
  }
  return result;
}

// Generate a random 6 digit code
export function generateSearchCode() {
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  // Get a 6 digit number
  const code = (randomArray[0] % 900000) + 100000;
  return code.toString();
}

// Hash a string using SHA-256
export async function hashString(string) {
  const msgBuffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
