 import appealRepository from "../repositories/appealRepository.js";

 import challengeRepository from "../repositories/challengeRepositories.js";

 

 const validateAppealNotes = (
  notes
) => {

  if (!notes) {
    throw new Error(
      "Appeal notes are required"
    );
  }

  const wordCount =
    notes
      .trim()
      .split(/\s+/).length;

  if (wordCount < 50) {
    throw new Error(
      "Appeal notes must contain at least 50 words"
    );
  }

  if (wordCount > 500) {
    throw new Error(
      "Appeal notes cannot exceed 500 words"
    );
  }
};

const validateAppealEligibility = (
  challenge
) => {

  if (
    challenge?.witness
      ?.decision !==
    "REJECTED"
  ) {
    throw new Error(
      "Appeal is only allowed for rejected challenges"
    );
  }
};

const validateSingleAppealRule = (
  existingAppeal
) => {

  if (existingAppeal) {
    throw new Error(
      "This challenge has already been appealed"
    );
  }
};

const validateAppealWindow = (
  decidedAt
) => {

  const appealDeadline =
    new Date(decidedAt);

  appealDeadline.setHours(
    appealDeadline.getHours() + 6
  );

  if (
    new Date() >
    appealDeadline
  ) {
    throw new Error(
      "Appeal window has expired"
    );
  }
};



 const submitAppeal = async ({
  challengeId,
  notes,
  imageUrl,
}) => {

  validateAppealNotes(
    notes
  );

  const challenge =
    await challengeRepository
      .getChallengeById(
        challengeId
      );

  validateAppealEligibility(
    challenge
  );

  validateAppealWindow(
    challenge.witness.decidedAt
  );

  const existingAppeal =
    await appealRepository
      .getByChallengeId(
        challengeId
      );

  validateSingleAppealRule(
    existingAppeal
  );

    const appeal = await appealRepository
      .createAppeal({
        challengeId,
        notes,
        imageUrl,
      });


};

export default {
  submitAppeal,
};