 const createWitnessReviewMessage = ({
  witnessName,
  challengeTitle,
  reviewUrl,
}) => {

  return `Hey ${witnessName},

I created a commitment on Rigga and selected you as my accountability witness.

Commitment:
${challengeTitle}

Please review my progress using the link below:

${reviewUrl}

Your review helps keep me accountable.`;
};

export default {
  createWitnessReviewMessage,
};