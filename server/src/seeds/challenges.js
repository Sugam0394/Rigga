import mongoose from "mongoose";
import dotenv from "dotenv";

 import { Challenge } from "../models/challengeModel.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const challenges = [
  {
    title: "7-Day No Social Media",
    description:
      "No Instagram, TikTok, or YouTube scrolling for 7 days.",

    consequence:
      "Rigga will send a humiliation message to your accountability witness.",

    stakeType: "social",

    isPaid: false,

    price: 0,

    category: "discipline",

    difficulty: "medium",
  },

  {
    title: "Daily 20 Push-Ups",

    description:
      "Complete 20 push-ups daily and submit proof.",

    consequence:
      "Miss one day and Rigga roasts your inconsistency.",

    stakeType: "photo",

    isPaid: false,

    price: 0,

    category: "fitness",

    difficulty: "easy",
  },

  {
    title: "5 AM Wake-Up Challenge",

    description:
      "Wake up before 5 AM for 7 days straight.",

    consequence:
      "Failure triggers savage AI humiliation messages.",

    stakeType: "social",

    isPaid: true,

    price: 199,

    category: "discipline",

    difficulty: "hard",
  },
];

const seedChallenges = async () => {
  try {
    await connectDB();

    await Challenge.deleteMany({});

    console.log("Old challenges removed");

    await Challenge.insertMany(challenges);

    console.log("Challenges seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedChallenges();