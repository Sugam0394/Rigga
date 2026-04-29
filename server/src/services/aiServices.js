 import Groq from "groq-sdk";

// Initialize Groq with your API Key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

 export const generateAIReply = async (message, user) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are 'Rigga', a ruthless, toxic, and sarcastic habit enforcer...` // Tumhara purana prompt
        },
        { role: "user", content: message },
      ],
      // 🔥 YAHAN CHANGE KARO
      model: "llama-3.3-70b-versatile", 
      temperature: 0.8,
    });

    return chatCompletion.choices[0]?.message?.content || "Kaam kar aalsi! 😤";
  } catch (error) {
    console.error("❌ Groq Error:", error.message);
    // Fallback logic
    return "Mera dimaag mat kha, server down hai par teri pitai fix hai! 😤";
  }
};