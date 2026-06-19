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

  const phoneRegex =
  /^\+[1-9]\d{7,14}$/;

if (
  !phoneRegex.test(
    userData.phone
  )
) {
  throw new Error(
    "Phone must be in E.164 format"
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
 const safeUserData = {
  name: userData.name,
  email: userData.email,
  phone: userData.phone,
};

return userRepository
  .createUser(
    safeUserData
  );
};

 const getUserById = async (
  userId
) => {
  const user =
    await userRepository
      .getUserById(
        userId
      );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return {
    id: user._id,
    name: user.name,
    phone: user.phone,
    role: user.role,
  };
};

export default {
  createUser,
  getUserById,
};