# 24-Hour Message Auto-Delete Explained

At AnonymousChat, we don't believe that human conversations are meant to be permanently etched into a database for the rest of time. Think about it: when you speak to someone in the physical world, your words disappear the moment they leave your mouth. 

We brought that natural human experience to the digital realm with our **24-Hour Auto-Delete** architecture. Here is exactly how it works.

## The Asynchronous Balance

Some highly secure apps require both users to be online at the exact same time. While extremely secure, this is incredibly inconvenient. 

To solve this, we temporarily store encrypted message payloads in our secure Google Sheets backend. This allows User A to send a message at 9:00 AM, and User B to read it at 2:00 PM. We facilitate asynchronous communication without sacrificing the overarching promise of anonymity.

## The 24-Hour Execution

Exactly 24 hours after a message is dispatched, our automated backend triggers an execution loop. 

This script iterates through the active database and identifies any timestamp older than 24 hours. When a match is found:
1. The message length and participant IDs are stripped and moved to an isolated `DeletedMessages` audit log to prevent abuse.
2. The actual contents of the message are permanently and irretrievably wiped from the active database.

## Why Not Instantly?

The 24-hour window provides the perfect balance between usability and extreme privacy. It guarantees that your digital footprint evaporates daily, ensuring that a compromised device tomorrow cannot reveal the conversations of yesterday.
