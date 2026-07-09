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





        <div className="witness-invitation-page__hero">

  <div className="witness-invitation-page__badge">
    Rigga Trusted Invitation
  </div>

  <h1 className="witness-invitation-page__title">
    {invitation.creatorName} invited you to help
    verify a personal commitment.
  </h1>

  <p className="witness-invitation-page__description">
    You were selected because your honest review
    matters. Please take a moment to understand the
    commitment before deciding whether to become the
    witness.
  </p>

        </div>




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

      <section className="witness-invitation-page__info">

  <div className="witness-invitation-page__info-card">
    <h3>Why were you invited?</h3>

    <p>
      {invitation.creatorName} chose you because they
      trust your honest judgment. Your role is to
      verify whether this commitment was completed.
    </p>
  </div>

  <div className="witness-invitation-page__info-card">
    <h3>What will happen next?</h3>

    <p>
      If you continue, you'll review the commitment
      details and later be asked to honestly confirm
      whether it was completed. There is no public
      sharing and no account is required.
    </p>
  </div>

  <div className="witness-invitation-page__info-card">
    <h3>Privacy</h3>

    <p>
      This invitation is private. Your review is only
      used for accountability between you and the
      challenge creator.
    </p>
  </div>

       </section>

      <p className="witness-invitation-page__cta-note">
  Continuing does not submit your review. You'll first
  see the full challenge details before making any
  decision.
</p>
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