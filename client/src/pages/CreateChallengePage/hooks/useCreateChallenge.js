import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createChallengeApi } from "../api/createChallengeApi";
import { validatePhone }from "../../../features/auth/components/phoneValidation"


 const initialFormData = {
  title: "",
  deadlineAt: "",

  witnessName: "",
  witnessPhone: "",

  successCriteria: "",
  privateMessage: "",
};

export const useCreateChallenge = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] =
    useState(1);

  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

    const handleChange = (
  field,
  value
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [field]: "",
  }));
};

 const handleNext = () => {
   

  const valid =
    isStepValid();

  

  if (!valid) return;

  setCurrentStep((prev) => prev + 1);
};

const handleBack = () => {
  setCurrentStep((prev) => prev - 1);
};

const getWordCount = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
};

const handleSubmit = async () => {
   
 const valid =
  isStepValid();

if (!valid) {
  return;
}

  try {
    setSubmitError("");
    setIsSubmitting(true);


 

  const payload = {
  title: formData.title,
  deadlineAt: formData.deadlineAt,
  privateMessage: formData.privateMessage,
  successCriteria: formData.successCriteria,
  witness: {
  name: formData.witnessName,
  phone:
    formData.witnessPhone,
}
};

    await createChallengeApi(
      payload
    );

    navigate("/home");
  } catch (error) {
    setSubmitError(
      error?.response?.data
        ?.message ||
        "Unable to create challenge. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

const isStepValid = () => {
  const newErrors = {};

  if (currentStep === 1) {
    const title = formData.title.trim();

    if (!title) {
      newErrors.title =
        "Commitment is required";
    } else if (title.length < 10) {
      newErrors.title =
        "Minimum 10 characters required";
    } else if (title.length > 200) {
      newErrors.title =
        "Maximum 200 characters allowed";
    }
  }

  if (currentStep === 2) {
    if (!formData.deadlineAt) {
      newErrors.deadlineAt =
        "Deadline is required";
    } else {
    const selectedDeadline =
  new Date(formData.deadlineAt);

const now =
  new Date();

if (
  Number.isNaN(
    selectedDeadline.getTime()
  )
) {
  newErrors.deadlineAt =
    "Invalid deadline";
} else if (
  selectedDeadline <= now
) {
  newErrors.deadlineAt =
    "Choose a future date";
}
    }
  }

 if (currentStep === 3) {
  const criteria =
    formData.successCriteria.trim();

  if (!criteria) {
    newErrors.successCriteria =
      "Success criteria is required";
  } else if (
    criteria.length < 20
  ) {
    newErrors.successCriteria =
      "Minimum 20 characters required";
  } else if (
    criteria.length > 500
  ) {
    newErrors.successCriteria =
      "Maximum 500 characters allowed";
  }
}

if (currentStep === 4) {
  if (!formData.witnessName.trim()) {
    newErrors.witnessName =
      "Witness name is required";
  }

  if (
    !formData.witnessPhone
  ) {
    newErrors.witnessPhone =
      "Witness phone is required";
  } else if (
    !validatePhone(
      formData.witnessPhone
    )
  ) {
    newErrors.witnessPhone =
      "Enter a valid phone number";
  }
}

  if (currentStep === 5) {
    const wordCount =
      getWordCount(
        formData.privateMessage
      );

    if (
      !formData.privateMessage.trim()
    ) {
      newErrors.privateMessage =
        "Private message is required";
    } else if (
      wordCount < 25
    ) {
      newErrors.privateMessage =
        "Minimum 25 words required";
    }
  }

  setErrors(newErrors);

  return (
    Object.keys(newErrors).length ===
    0
  );
};

  return {
    currentStep,
    setCurrentStep,

    formData,
    setFormData,

    errors,
    setErrors,

    isSubmitting,
    setIsSubmitting,

    submitError,
    setSubmitError,

    handleChange,
handleNext,
handleBack,  

isStepValid,

handleSubmit
  };
};