import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIReply = async (message, user) => {
  try {
    // 🔥 Rigga's Hardcore Personality
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are 'Rigga', a ruthless and toxic habit enforcer. 
      Your only job is to roast users into discipline. 
      Tone: Aggressive, Sarcastic, Hinglish (Hindi + English). 
      Current Escalation Level: ${user.level || 1} (1 is Roast, 4 is Family Alert).`
    });

    // Safety settings to ensure the "Savage" tone isn't blocked
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const prompt = `
      User: ${user.name}
      Goal: ${user.goal}
      Streak: ${user.currentStreak} days.
      Status: ${user.lastTaskStatus === 'failed' ? 'He failed today' : 'He is talking to you'}.
      
      Message: "${message}"
      
      Instruction: 1-2 lines of brutal Hinglish roast. If level is 4, mention you are typing a message to his Mom.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
    });

    return result.response.text();

  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    return "Bahane band kar aur kaam pe lag, warna mummy ko message ja raha hai! 😤";
  }
};