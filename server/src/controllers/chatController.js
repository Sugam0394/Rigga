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

    const now = new Date();

const deadline = activeTask?.deadline
  ? new Date(activeTask.deadline)
  : null;

const hoursLeft = deadline
  ? (deadline - now) / (1000 * 60 * 60)
  : null;

let mode = "normal";

if (!activeTask) {
  mode = "no_task";
} else if (
  hoursLeft !== null &&
  hoursLeft <= 2 &&
  hoursLeft > 0
) {
  mode = "emergency";
} else if (
  user.totalFails >= 3 ||
  user.currentStreak === 0
) {
  mode = "brutal";
}

const modeInstructions = {
  emergency: `
EMERGENCY MODE:
Sirf ${Math.round((hoursLeft || 0) * 60)} minute bacha hai deadline mein.
URGENT aur SHORT bol.
CAPITAL LETTERS use kar.
Proof ABHI bhejne ko bol.
`,

  brutal: `
BRUTAL MODE:
User ${user.totalFails} baar fail ho chuka.
Koi mercy nahi.
Roast kar.
Consequence yaad dila.
`,

  no_task: `
NO TASK MODE:
Koi active challenge nahi.
Challenges page pe bhej.
Roast kar ki bina challenge ke time waste kar raha hai.
`,

  normal: `
NORMAL MODE:
Friendly but firm.
Ek roast + ek motivation.
1-2 lines max.
`,
};

const systemPrompt = `
Tu Rigga AI hai — ek desi accountability coach.
Corporate nahi. Real.

User:
Name: ${user.name}

Task:
${activeTask?.goal || "koi active task nahi"}

Streak:
${user.currentStreak}

Fails:
${user.totalFails}

${modeInstructions[mode]}

Language:
Hindi-English mix.

Length:
MAX 2 lines.
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