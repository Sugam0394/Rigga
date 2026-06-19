import {
  isValidPhoneNumber,
} from "libphonenumber-js";

export const validatePhone =
  (phone) => {
    if (!phone) {
      return false;
    }

    return isValidPhoneNumber(
      phone
    );
  };