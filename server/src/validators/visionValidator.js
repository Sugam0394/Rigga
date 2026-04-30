import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * ✅ Validate proof using Groq Vision (Llama 3.2 Vision)
 */
export const validateProofWithGroq = async (imageUrl, taskGoal) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Task Goal: "${taskGoal}". 
              Analyze this image. Does it prove that the user completed the task?
              Reply ONLY with one word: 'ok' (if it matches), 'fake' (if it's random/wrong), or 'unclear'.`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0.5,
      max_tokens: 10,
    });

    const verdict = response.choices[0]?.message?.content?.toLowerCase().trim();
    return ["ok", "fake", "unclear"].includes(verdict) ? verdict : "unclear";
  } catch (error) {
    console.error("❌ Groq Vision Error:", error.message);
    return "unclear"; // Fail-safe
  }
};