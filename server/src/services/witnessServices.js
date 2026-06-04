 import challengeRepository from "../repositories/challengeRepositories.js"
 
 
 
 
 const notifyWitness = async (challenge) => {
  const message = `
${challenge.witness.name},

You have been selected as a witness for a Rigga challenge.

Goal:
${challenge.title}

Deadline:
${new Date(
  challenge.deadline
).toDateString()}

Rigga may contact you later for verification.
`;

  await challengeRepository.updateWitnessNotifiedAt(
  challenge._id
);


};

export default {
  notifyWitness,
};