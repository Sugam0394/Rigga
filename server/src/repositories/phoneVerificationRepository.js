import PhoneVerification
  from "../models/phoneVerificationModel.js";

const findByPhone = async (
  phone
) => {
  return PhoneVerification.findOne({
    phone,
  });
};

const createVerification = async (
  data
) => {
  return PhoneVerification.create(
    data
  );
};

const updateVerification = async (
  phone,
  updates
) => {
  return PhoneVerification.findOneAndUpdate(
    { phone },
    updates,
    { new: true }
  );
};

const incrementAttempts = async (
  phone
) => {
  return PhoneVerification.findOneAndUpdate(
    { phone },
    {
      $inc: {
        attempts: 1,
      },
    },
    {
      new: true,
    }
  );
};

export default {
  findByPhone,
  createVerification,
  updateVerification,
  incrementAttempts
};