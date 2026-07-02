import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getWitnessInvitationApi } from "./api/witnessInvitationApi";

import "./WitnessInvitationPage.css";

const WitnessInvitationPage = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [invitation, setInvitation] =
    useState(null);

  useEffect(() => {
    const loadInvitation =
      async () => {
        try {
          const response =
            await getWitnessInvitationApi(
              token
            );

          setInvitation(
            response.invitation
          );
        } catch (error) {
          setError(
            error?.response?.data
              ?.message ||
              "Unable to load invitation."
          );
        } finally {
          setLoading(false);
        }
      };

    loadInvitation();
  }, [token]);

  const handleContinue = () => {
    navigate(`/review/${token}`);
  };

  if (loading) {
    return (
      <main className="witness-invitation-page">
        <div className="witness-invitation-page__container">
          <p>
            Loading invitation...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="witness-invitation-page">
        <div className="witness-invitation-page__container">
          <h1>
            Invitation
          </h1>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="witness-invitation-page">
      <div className="witness-invitation-page__container">
        <h1 className="witness-invitation-page__title">
          {invitation.creatorName} invited
          you to be a witness.
        </h1>

        <p className="witness-invitation-page__description">
          Please review this
          commitment before deciding
          whether you want to become
          the witness.
        </p>

        <section className="witness-invitation-page__card">
          <div className="witness-invitation-page__item">
            <h3>
              Commitment
            </h3>

            <p>
              {invitation.title}
            </p>
          </div>

          <div className="witness-invitation-page__item">
            <h3>
              Deadline
            </h3>

            <p>
              {new Date(
                invitation.deadlineAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="witness-invitation-page__item">
            <h3>
              Success Criteria
            </h3>

            <p>
              {
                invitation.successCriteria
              }
            </p>
          </div>
        </section>

        <button
          type="button"
          className="witness-invitation-page__button"
          onClick={
            handleContinue
          }
        >
          I Will Review This
          Invitation
        </button>
      </div>
    </main>
  );
};

export default WitnessInvitationPage;