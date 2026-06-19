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

export default {
  findByPhone,
  createVerification,
  updateVerification,
};