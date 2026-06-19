import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL,
      {
        dbName: DB_NAME,
      }
    );

    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host} | DB NAME: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

