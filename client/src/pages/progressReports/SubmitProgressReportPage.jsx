 import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProgressReportForm
  from "./components/ProgressReportForm";

import useSubmitProgressReport
  from "./hooks/useSubmitProgressReport";

const SubmitProgressReportPage = () => {
    const { id } =
      useParams();

    const navigate =
      useNavigate();

    const {
      submit,
      loading,
      error,
    } =
      useSubmitProgressReport();

    const handleSubmit =
      async ({
        notes,
        image,
      }) => {
        await submit({
          challengeId: id,
          notes,
          image,
        });

        navigate(
          `/challenges/${id}`
        );
      };

    return (
      <div>
        <h1>
          Submit Progress Report
        </h1>

        {error && (
          <p>{error}</p>
        )}

        <ProgressReportForm
          onSubmit={
            handleSubmit
          }
          loading={loading}
        />
      </div>
    );
  };

export default
  SubmitProgressReportPage;