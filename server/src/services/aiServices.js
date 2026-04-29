 import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateAIReply = async (message, user) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are 'Rigga', the most ruthless and toxic habit enforcer in India. 
          Use 100% Hinglish. Be extremely sarcastic and "bad-tameez". 
          Target: ${user.name}, Goal: ${user.goal}, Level: ${user.level || 1}. 
          No polite talk, just brutal roasts under 2 lines.`
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.8,
    });

    return chatCompletion.choices[0]?.message?.content || "Kaam kar aalsi! 😤";
  } catch (error) {
    console.error("❌ Groq Error:", error.message);
    return "Mera dimaag mat kha, server down hai par teri pitai fix hai! 😤";
  }
};