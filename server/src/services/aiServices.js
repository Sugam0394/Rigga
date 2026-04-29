 import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIReply = async (message, user) => {
  try {
    // 1. Model Setup (Using latest stable version)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Added '-latest'
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    // 2. Persona Definition
    const systemPersona = `You are 'Rigga', a ruthless and toxic habit enforcer. 
      Your only job is to roast users into discipline. 
      Tone: Aggressive, Sarcastic, Hinglish (Hindi + English). 
      Current Escalation Level: ${user.level || 1} (1 is Roast, 4 is Family Alert).
      User Goal: ${user.goal || "Be disciplined"}.
      User Streak: ${user.currentStreak || 0} days.`;

    // 3. Prompt Construction
    const prompt = `User ${user.name} says: "${message}". 
    Give a 1-line brutal Hinglish roast. If level is 4, remind him you're texting his Mom now.`;

    // 4. Content Generation
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: systemPersona + "\n\n" + prompt }] }
      ]
    });

    const responseText = result.response.text();
    return responseText || "Bahane mat bana, kaam kar! 😤";

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    // Error handle karne ke liye fallback
    return "Mera dimaag mat kha, network issue hai par teri pitai fix hai! Kaam kar! 😤";
  }
};