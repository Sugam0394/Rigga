import { User } from "../models/userModel.js";


export const handleUser = async (phone) => {
  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
      console.log('🆕 New user created:', phone);
    } else {
      console.log('✅ Existing user:', phone);
    }

    return user;
  } catch (error) {
    console.error('❌ Error in handleUser:', error.message);
    throw error;
  }
};