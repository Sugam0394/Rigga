import userService
  from "../services/userService.js";

const createUser = async (
  req,
  res
) => {
  try {
    const user =
      await userService
        .createUser(
          req.body
        );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getUserById = async (
  req,
  res
) => {
  try {

   if (
      req.user.userId !==
      req.params.id
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Forbidden",
        });
    }

    const user =
      await userService
        .getUserById(
          req.params.id
        );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

export default {
  createUser,
  getUserById,
};