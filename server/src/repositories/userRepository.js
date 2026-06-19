import User
  from "../models/userModel.js";

const createUser = async (
  userData
) => {
  return User.create(
    userData
  );
};

const getUserById = async (
  userId
) => {
  return User.findById(
    userId
  );
};

const getUserByEmail = async (
  email
) => {
  return User.findOne({
    email,
  });
};

const getUserByPhone = async (
  phone
) => {
  return User.findOne({
    phone,
  });
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByPhone,
};