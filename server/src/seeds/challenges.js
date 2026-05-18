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
    title: "Subah 5 Baje Uthna",

    description:
      "Roz subah 5 baje uthna hai. Phone screen ka screenshot bhejno time visible ke saath.",

    consequence:
      "Tumhari ek embarrassing purani photo witness ko WhatsApp pe jayegi. Woh decide karega kise forward kare.",

    stakeType: "photo",

    isPaid: true,

    price: 199,

    category: "discipline",

    difficulty: "hard",

    isActive: true,
  },

  {
    title: "7 Din No Social Media",

    description:
      "7 din tak Instagram, YouTube, Twitter band. Roz screen time screenshot proof.",

    consequence:
      "Tere best friend ko Rigga ki taraf se message jayega: tumne bet haari, treat dena padega.",

    stakeType: "social",

    isPaid: false,

    price: 0,

    category: "discipline",

    difficulty: "medium",

    isActive: true,
  },

  {
    title: "Roz 100 Push-Ups",

    description:
      "Aaj se roz 100 push-ups. Photo ya short video proof bhejni hai session ki.",

    consequence:
      "Teri mom ko WhatsApp message jayega: aaj ka health goal toda.",

    stakeType: "photo",

    isPaid: true,

    price: 199,

    category: "fitness",

    difficulty: "hard",

    isActive: true,
  },

  {
    title: "Daily 2 Ghante Padhai",

    description:
      "Roz 2 ghante focused study. Notes ya books ki photo timestamp ke saath.",

    consequence:
      "College group mein message jayega ki tune aaj nahi padha. Public accountability.",

    stakeType: "social",

    isPaid: true,

    price: 199,

    category: "study",

    difficulty: "medium",

    isActive: true,
  },

  {
    title: "21 Din Workout Streak",

    description:
      "21 din lagatar gym ya workout. Daily selfie ya screenshot proof.",

    consequence:
      "Instagram par manually public apology story post karni padegi. Rigga screenshot maangega proof ke liye.",

    stakeType: "photo",

    isPaid: true,

    price: 199,

    category: "fitness",

    difficulty: "hard",

    isActive: true,
  }

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