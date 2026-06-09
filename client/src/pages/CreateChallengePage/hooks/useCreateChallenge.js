import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createChallengeApi } from "../api/createChallengeApi";

 const initialFormData = {
  title: "",
  deadline: "",

  witnessName: "",
  witnessCountryCode: "+1",
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
  console.log(
    "CURRENT STEP:",
    currentStep
  );

  const valid =
    isStepValid();

  console.log(
    "VALID:",
    valid
  );

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
    console.log(
    "HANDLE SUBMIT CALLED"
  );
  const valid = isStepValid();

  if (!valid) return;

  try {
    setSubmitError("");
    setIsSubmitting(true);


    const witnessPhone =
  `${formData.witnessCountryCode}${formData.witnessPhone}`;


    const payload = {
      title: formData.title,
      deadline: formData.deadline,
      privateMessage:
        formData.privateMessage,
      successCriteria:
        formData.successCriteria,

      witness: {
        name: formData.witnessName,
        phone: witnessPhone,
      },
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
    if (!formData.deadline) {
      newErrors.deadline =
        "Deadline is required";
    } else {
   const today =
  new Date()
    .toISOString()
    .split("T")[0];

if (
  formData.deadline <= today
) {
  newErrors.deadline =
    "Choose a future date";
}
    }
  }

  if (currentStep === 3) {
    if (!formData.witnessName.trim()) {
      newErrors.witnessName =
        "Witness name is required";
    }

  const phoneRegex =
  /^\+[1-9]\d{7,14}$/;

const witnessPhone =
  `${formData.witnessCountryCode}${formData.witnessPhone}`;

if (!formData.witnessPhone.trim()) {
  newErrors.witnessPhone =
    "Witness phone is required";
} else if (
  !phoneRegex.test(
    witnessPhone
  )
) {
  newErrors.witnessPhone =
    "Enter a valid phone number";
}

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
    const wordCount =
      getWordCount(
        formData.privateMessage
      );

    if (
      !formData.privateMessage.trim()
    ) {
      newErrors.privateMessage =
        "Stakes message is required";
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