 import Groq from "groq-sdk";
import axios from "axios";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Helper: URL to Base64 with Timeout & Size Check
 */
async function encodeImage(url) {
  try {
    const response = await axios.get(url, { 
      responseType: 'arraybuffer',
      timeout: 5000, // 5 seconds timeout taaki server hang na ho
      maxContentLength: 5 * 1024 * 1024 // 5MB Limit for safety
    });
    return Buffer.from(response.data).toString('base64');
  } catch (error) {
    console.error("❌ Image Fetch Error:", error.message);
    throw new Error("Could not fetch proof image");
  }
}

export const validateProofWithGroq = async (imageUrl, taskGoal) => {
  try {
    const base64Image = await encodeImage(imageUrl);

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a strict task validator for Rigga. Your only job is to compare an image with a stated goal. Respond with exactly ONE word: 'ok', 'fake', or 'unclear'. No punctuation, no explanation."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Goal: "${taskGoal}". Analyze this image. Does it prove the goal was completed? Output one word.`
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0, // 0 for deterministic results
      max_tokens: 5,   // Strict limit taaki AI lambe answer na de
    });

    const rawVerdict = response.choices[0]?.message?.content?.trim().toLowerCase() || "unclear";
    
    // 🔥 Strict matching logic
    if (rawVerdict === "ok") return "ok";
    if (rawVerdict === "fake") return "fake";
    
    // Secondary check for robustness
    if (rawVerdict.includes("ok") && !rawVerdict.includes("not")) return "ok";
    if (rawVerdict.includes("fake") || rawVerdict.includes("invalid")) return "fake";

    return "unclear";

  } catch (error) {
    console.error("❌ Groq Vision Critical Error:", error.message);
    return "unclear"; 
  }
};