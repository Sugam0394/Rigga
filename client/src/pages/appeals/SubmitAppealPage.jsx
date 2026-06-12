 import { useParams } from "react-router-dom";

// Hooks
import useSubmitAppeal from "./hooks/useSubmitAppeal";
import useChallengeDashboard from "../ChallengeDetails/hooks/useChallengeashboard";

// Components
import AppealForm from "./components/AppealForm";
import AppealErrorState from "./components/AppealErrorState";
import AppealLoadingState from "./components/AppealLoadingState";
import AppealSubmittedState from "./components/AppealSubmittedState";
import AppealNotAllowedState from "./components/AppealNotAllowedState";

const SubmitAppealPage = () => {
  const { id } = useParams();

  const {
    dashboard,
    loading: challengeLoading,
    error: challengeError,
  } = useChallengeDashboard(id);

  const {
    loading,
    error,
    success,
    submitAppeal,
  } = useSubmitAppeal();

  const handleSubmitAppeal =
    async ({
      notes,
      imageUrl,
    }) => {
      await submitAppeal({
        challengeId: id,
        notes,
        imageUrl,
      });
    };

  if (challengeLoading) {
    return (
      <AppealLoadingState />
    );
  }

  if (challengeError) {
    return (
      <AppealErrorState
        message={challengeError}
      />
    );
  }

  if (
    dashboard?.challenge?.status !==
    "REJECTED"
  ) {
    return (
      <AppealNotAllowedState />
    );
  }

  if (loading) {
    return (
      <AppealLoadingState />
    );
  }

  if (success) {
    return (
      <AppealSubmittedState />
    );
  }

  return (
    <div>
      <h1>
        Submit Appeal
      </h1>

      <AppealForm
        loading={loading}
        onSubmit={
          handleSubmitAppeal
        }
      />

      {error && (
        <AppealErrorState
          message={error}
        />
      )}
    </div>
  );
};

export default SubmitAppealPage;