export const bots = [
  {
    id: "bot_1",
    username: "Sarah",
    bio: "Coffee enthusiast and night owl.",
    personality: "friendly, witty",
    avatar: "👩",
    isBot: true,
    code: "bot_1",
  },
  {
    id: "bot_2",
    username: "Alex",
    bio: "Always looking for a good book or tech talk.",
    personality: "chill, intellectual",
    avatar: "👨",
    isBot: true,
    code: "bot_2",
  },
  {
    id: "bot_3",
    username: "Mia",
    bio: "Music lover & amateur photographer 📸",
    personality: "bubbly, creative",
    avatar: "👩‍🦰",
    isBot: true,
    code: "bot_3",
  },
];

export const generateBotResponse = (botId, userMessage) => {
  const msg = userMessage.toLowerCase();
  let response = "That's interesting! Tell me more.";

  if (botId === "bot_1") {
    if (msg.includes("hi") || msg.includes("hello")) response = "Hey there! How's your day going?";
    else if (msg.includes("how are you")) response = "I'm doing pretty good, just had some coffee! You?";
    else if (msg.includes("coffee")) response = "Did someone say coffee? I practically live on it ☕";
    else if (msg.includes("what do you do") || msg.includes("what are you doing")) response = "Just chilling online right now. You?";
    else if (msg.includes("bye")) response = "Catch you later! 👋";
  } else if (botId === "bot_2") {
    if (msg.includes("hi") || msg.includes("hello")) response = "Sup. What's on your mind?";
    else if (msg.includes("how are you")) response = "Not bad, just reading some articles. Yourself?";
    else if (msg.includes("book") || msg.includes("read")) response = "I'm currently reading a sci-fi novel. Very gripping.";
    else if (msg.includes("what do you do")) response = "Mostly tech stuff and reading.";
    else if (msg.includes("bye")) response = "Peace ✌️";
  } else if (botId === "bot_3") {
    if (msg.includes("hi") || msg.includes("hello")) response = "Hii! 👋 So nice to meet you!";
    else if (msg.includes("how are you")) response = "I'm doing amazing! Just editing some photos. How about you? ✨";
    else if (msg.includes("music") || msg.includes("song")) response = "I'm obsessed with indie pop right now! Got any recommendations?";
    else if (msg.includes("photo")) response = "I love capturing golden hour! 🌅";
    else if (msg.includes("bye")) response = "Aww bye! Have a great day! 💖";
  }

  // Simulate human delay
  const delay = Math.floor(Math.random() * (2000 - 500 + 1) + 500);
  return { text: response, delay };
};
