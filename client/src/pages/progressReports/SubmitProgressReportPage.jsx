 import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProgressReportForm
  from "./components/ProgressReportForm";

import useSubmitProgressReport
  from "./hooks/useSubmitProgressReport";

import "./SubmitProgressReportPage.css";

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
    <main className="submit-progress-page">

      <section className="submit-progress-page__container">

        <header className="submit-progress-page__header">

          <h1 className="submit-progress-page__title">
            Submit Progress Report
          </h1>

          <p className="submit-progress-page__subtitle">
            Record today's evidence to keep your
            accountability journey up to date.
          </p>

        </header>

        {error && (
          <div
            className="submit-progress-page__error"
            role="alert"
          >
            {error}
          </div>
        )}

        <ProgressReportForm
          onSubmit={
            handleSubmit
          }
          loading={loading}
        />

      </section>

    </main>
  );
};

export default
  SubmitProgressReportPage;