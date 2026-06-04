import appealService
  from "../services/appealService.js";

const submitAppeal = async (
  req,
  res,
  next
 
) => {

  try {

    const { id } =
      req.params;

    const {
      notes,
      imageUrl,
    } = req.body;

    const appeal =
      await appealService
        .submitAppeal({
          challengeId: id,
          notes,
          imageUrl,
        });

    return res.status(201).json({
      success: true,
      data: appeal,
    });

  } catch (error) {

    next(error);

  }
};

export default {
  submitAppeal,
};