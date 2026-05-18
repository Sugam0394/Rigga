import Groq from "groq-sdk";

import { User } from "../models/userModel.js";

import { ChatMessage } from "../models/chatModel.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithRigga = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    /**
     * USER FETCH
     */
    const user = await User.findById(req.user._id)
      .populate("activeTaskBox");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const activeTask = user.activeTaskBox;

    /**
     * SYSTEM PROMPT
     */
    const systemPrompt = `
Tu Rigga AI hai — ek desi accountability coach.

User ka naam:
${user.name}

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
Excuses tolerate nahi karta.
User ko discipline push karta hai.
`;

    /**
     * FETCH LAST 10 MESSAGES
     */
    const history = await ChatMessage.find({
      userId: user._id,
    })
      .sort({ createdAt: 1 })
      .limit(10)
      .lean();

    /**
     * SAVE CURRENT USER MESSAGE
     */
    await ChatMessage.create({
      userId: user._id,
      role: "user",
      text: message,
    });

    /**
     * GROQ CALL
     */
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          ...history.map((item) => ({
            role:
              item.role === "ai"
                ? "assistant"
                : "user",

            content: item.text,
          })),

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.8,

        max_tokens: 120,
      });

    /**
     * AI REPLY
     */
    const reply =
      completion.choices[0]?.message?.content ||
      "Bhai kuch toh gadbad hai 💀";

    /**
     * SAVE AI MESSAGE
     */
    await ChatMessage.create({
      userId: user._id,
      role: "ai",
      text: reply,
    });

    /**
     * RESPONSE
     */
    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.log("RIGGA CHAT ERROR:", error);

    return res.status(500).json({
      message: "Rigga AI failed",
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {

    const messages = await ChatMessage.find({
      userId: req.user._id,
    })
      .sort({ createdAt: 1 })
      .limit(20);

    return res.status(200).json({
      messages,
    });

  } catch (error) {

    console.log("CHAT HISTORY ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch chat history",
    });
  }
};