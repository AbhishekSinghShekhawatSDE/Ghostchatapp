# AnonymousChat: Frequently Asked Questions

**1. Do I need an email or phone number to sign up?**
No. We firmly believe that true anonymity cannot exist if your account is tied to a personal identifier. You only need to create a username and password.

**2. What is a Passphrase and why do I need it?**
Instead of sending a 2FA code to your phone (which tracks you), our server generates a secure 15-character cryptographic Passphrase during signup. You must save this locally. It ensures that even if someone guesses your password, they cannot access your account without the passphrase.

**3. Can you recover my Passphrase if I lose it?**
No. We do not store your Passphrase. We only store a one-way mathematical hash of it. If you lose your Passphrase, you lose access to your account forever. This is a strict security feature, not a bug.

**4. How do I find my friends on the app?**
You cannot search for users by their username to prevent scraping. You must obtain their unique 6-digit Search Code (found in their Settings) and enter it into the Search Bar.

**5. How long are my messages saved?**
Messages are temporarily stored to allow for asynchronous communication (e.g., if your friend is offline when you send the message). Exactly 24 hours after a message is sent, it is permanently and irreversibly deleted from our active database.

**6. Can you (the developers) read my messages?**
While messages are in transit and temporarily stored, they are tied only to random 6-digit codes, not identities. We do not monitor or read message contents, and after 24 hours, there is nothing left to read.

**7. Is there a mobile app?**
Our web application is built with responsive web design. It works perfectly on Safari (iOS) and Chrome (Android). You can "Add to Home Screen" to use it just like a native app without the invasive tracking of the App Stores.

**8. Can I delete a message before the 24 hours is up?**
Currently, messages are immutable once sent and will self-destruct exactly on the 24-hour mark. 

**9. How do you prevent spam?**
Because users cannot search a public directory or blast messages to usernames, spam is virtually impossible. A user can only message you if you explicitly give them your 6-digit code.

**10. Is it really free?**
Yes. We believe privacy is a fundamental human right.
