const buildWitnessViewModel = ({
  invitation,
  witness,
  review,
  appeal,
  timeline,
  loading,
  error,
}) => {
  return {
    invitation:
      invitation ?? null,

    witness:
      witness ?? null,

    review:
      review ?? null,

    appeal:
      appeal ?? null,

    timeline:
      timeline ?? [],

    loading:
      loading ?? false,

    error:
      error ?? null,
  };
};

export default {
  buildWitnessViewModel,
};