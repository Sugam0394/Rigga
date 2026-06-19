import mongoose from 'mongoose';
import {DB_NAME} from '../constant.js';

<<<<<<< HEAD
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,
    });

    console.log(
      `MongoB connected !! DB HOST: ${connectionInstance.connection.host} | DB NAME: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log('MONGODB Connection Error', error);
    process.exit(1);
  }
};

export default connectDB;
=======

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`MongoB connected !! DB HOST: ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("MONGODB Connection Error", error)
    process.exit(1)
  }
}

export default connectDB
>>>>>>> 647a7a72d248be7ffadb6cd90eddbd7372b70035
