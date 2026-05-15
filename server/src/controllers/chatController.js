import Groq from "groq-sdk";
import { User } from "../models/userModel.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithRigga = async (req, res) => {
  try {

    const { message } = req.body;

    const user = await User.findById(req.user._id)
      .populate("activeTaskBox");

    const activeTask = user.activeTaskBox;

    const systemPrompt = `
Tu Rigga AI hai — ek desi accountability coach.

User ka naam: ${user.name}

Active task:
${activeTask?.goal || "Koi active task nahi"}

Deadline:
${activeTask?.deadline || "No deadline"}

Current streak:
${user.currentStreak}

Total fails:
${user.totalFails}

Tu Hindi-English mix mein baat karta hai.
Kabhi roast karta hai.
Kabhi motivate karta hai.
Replies short rakhta hai (1-2 line).
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.8,
      max_tokens: 120,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Bhai kuch toh gadbad hai 💀";

    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Rigga AI failed",
    });
  }
};