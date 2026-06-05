 import userRepository
  from "../repositories/userRepository.js";

 const createUser = async (
  userData
) => {
  const existingUser =
    await userRepository
      .getUserByEmail(
        userData.email
      );

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const existingPhone =
  await userRepository
    .getUserByPhone(
      userData.phone
    );

if (existingPhone) {
  throw new Error(
    "Phone already exists"
  );
}

  return userRepository
    .createUser(
      userData
    );
};

const getUserById = async (
  userId
) => {
  return userRepository
    .getUserById(
      userId
    );
};

export default {
  createUser,
  getUserById,
};