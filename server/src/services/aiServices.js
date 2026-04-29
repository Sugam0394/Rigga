 import Groq from "groq-sdk";

// Initialize Groq with your API Key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateAIReply = async (message, user) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are 'Rigga', a ruthless, toxic, and sarcastic habit enforcer. 
          Your only job is to roast the user into discipline. 
          Rules:
          1. Tone: Highly aggressive, dark humor, and savage.
          2. Language: Use Hinglish (Mix of Hindi + English).
          3. Context: User Name: ${user.name}, Goal: ${user.goal}, Level: ${user.level || 1}.
          4. Instructions: 1-2 lines max. If Level is 4, threaten to leak their details to their family/witness.`
        },
        {
          role: "user",
          content: message,
        },
      ],
      // Llama 3.1 70B is perfect for roasting and very stable
      model: "llama-3.1-70b-versatile",
      temperature: 0.7, // Thoda creative roasting ke liye
      max_tokens: 100,
    });

    const reply = chatCompletion.choices[0]?.message?.content;
    return reply || "Bahane band kar aur kaam kar! 😤";

  } catch (error) {
    console.error("❌ Groq API Error:", error.message);
    return "Mera dimaag mat kha, server down hai par teri pitai fix hai! 😤";
  }
};