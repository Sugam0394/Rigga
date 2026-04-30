 import Groq from "groq-sdk";
import axios from "axios";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Helper: Image URL ko Base64 mein convert karne ke liye
 * Taaki Groq access error na de
 */
async function encodeImage(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data).toString('base64');
}

export const validateProofWithGroq = async (imageUrl, taskGoal) => {
  try {
    // 1. Image ko fetch karke Base64 banana
    const base64Image = await encodeImage(imageUrl);

    // 2. Groq Vision Call
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Goal: "${taskGoal}". Is this image valid proof? 
              Options: 'ok' (valid), 'fake' (unrelated), 'unclear'. 
              Give ONLY the word.`
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0.1, // Lower temperature = more consistent results
    });

    const verdict = response.choices[0]?.message?.content?.toLowerCase().replace(/[^a-z]/g, "");
    
    // Strict validation of output
    if (verdict.includes("ok")) return "ok";
    if (verdict.includes("fake")) return "fake";
    return "unclear";

  } catch (error) {
    console.error("❌ Groq Vision Error:", error.message);
    return "unclear"; // Fallback
  }
};