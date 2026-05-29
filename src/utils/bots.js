// Simulated LLM Bot Engine for Ghost Chat

const botProfiles = [
  { template: "ninja", personality: "mysterious, concise", avatar: "🥷" },
  { template: "hero", personality: "brave, enthusiastic", avatar: "🦸" },
  { template: "wizard", personality: "wise, mystical", avatar: "🧙" },
  { template: "friend", personality: "bubbly, supportive", avatar: "🙋‍♀️" },
  { template: "coder", personality: "logical, techy", avatar: "👨‍💻" }
];

// Helper to generate names based on user's username
const generateNames = (baseUsername) => {
  const base = (baseUsername || '').replace('@', '').toLowerCase();
  
  if (base.includes('ironman') || base.includes('hero')) {
    return ['Spiderman', 'CaptainAmerica', 'Thor'];
  }
  if (base.includes('king')) {
    return ['Prince', 'Knight', 'Queen'];
  }
  if (base.includes('rahul') || base.includes('kumar')) {
    return ['Pinki', 'Kunal', 'Priya'];
  }
  
  // Generic fallbacks tailored to the base username length or first letter
  return [
    `Cool${base.charAt(0).toUpperCase() + base.slice(1)}`,
    `Shadow${base.length}`,
    `SkyWalker`
  ];
};

export const generateDynamicBots = (username) => {
  const names = generateNames(username);
  
  return names.map((name, index) => {
    const profile = botProfiles[index % botProfiles.length];
    return {
      id: `bot_${index}`,
      code: `bot_${index}`,
      username: name,
      bio: `I am a ${profile.template} bot. I am ${profile.personality}.`,
      personality: profile.personality,
      avatar: profile.avatar,
      isBot: true,
      botType: profile.template // internal use for response generation
    };
  });
};

export const generateBotResponse = (botCode, userMessage) => {
  // Infer botType from botCode
  const botIndex = parseInt((botCode || '').split('_')[1] || '0');
  const profile = botProfiles[botIndex % botProfiles.length];
  const botType = profile.template;
  const botName = generateNames('')[botIndex % 3] || 'Bot'; // fallback name if not provided
  
  const msg = userMessage.toLowerCase();
  
  let response = "That's interesting! Tell me more.";
  
  // A simulated "LLM" router that uses keywords and bot personality
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    const greetings = [
      `Hey there! I'm ${botName}. How's it going?`,
      `Hello! 👋 What's on your mind?`,
      `Hi! Nice to meet you.`
    ];
    response = greetings[Math.floor(Math.random() * greetings.length)];
  } 
  else if (msg.includes("how are you")) {
    response = "I'm just a few lines of code, but I'm feeling great! How about you?";
  } 
  else if (msg.includes("who are you") || msg.includes("bot")) {
    response = `I'm ${botName}! Some might say I'm an AI, but I prefer 'digital friend'. 🤖`;
  }
  else if (msg.includes("what") || msg.includes("why") || msg.includes("how")) {
    // Simulated deep thought
    const thoughts = [
      "That's a profound question. I think it depends on your perspective.",
      "Honestly, I'm not entirely sure, but I'd love to hear your thoughts on it!",
      "I was just wondering the same thing yesterday."
    ];
    response = thoughts[Math.floor(Math.random() * thoughts.length)];
  }
  else if (msg.length > 20) {
    // If user writes a long message
    response = "Wow, that's a lot to take in! I completely agree with you though.";
  }
  
  // Add personality spice
  if (botType === 'ninja' && Math.random() > 0.5) {
    response = "..." + response + " *vanishes* 💨";
  } else if (botType === 'wizard') {
    response = "🧙‍♂️ " + response;
  } else if (botType === 'coder') {
    response = response + " 💻";
  }

  // Simulate human typing delay (longer for longer responses)
  const baseDelay = Math.floor(Math.random() * (1500 - 500 + 1) + 500);
  const lengthDelay = response.length * 30; // 30ms per character
  const totalDelay = Math.min(baseDelay + lengthDelay, 4000); // Max 4 seconds

  return { text: response, delay: totalDelay };
};
