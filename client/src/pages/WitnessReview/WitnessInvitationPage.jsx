import { useEffect, useState } from "react";
 import {
  useParams,
} from "react-router-dom";

import { getWitnessInvitationApi } from "./api/witnessInvitationApi";
import useInvitationDecision from "./hooks/useInvitationDecision";
import "./WitnessInvitationPage.css";

const WitnessInvitationPage = () => {
  

  const { token } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const [name, setName] = useState("");

const [phone, setPhone] = useState("");


const {
  accept,
  decline,
  loading: submitting,
  error: submitError,
  success,
} = useInvitationDecision();

const handleAccept = async () => {
  await accept({
    token,
    name,
    phone,
  });
};

const handleDecline = async () => {
  await decline(token);
};

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
if (success) {
  return (
    <main className="witness-invitation-page">
      <div className="witness-invitation-page__container">

        <h1>
          Invitation Accepted
        </h1>

        <p>
          Thank you for accepting this
          invitation.
        </p>

        <p>
          The challenge is now active.
        </p>

        <p>
          When the challenge reaches its
          review stage, you'll receive a
          separate review invitation.
        </p>

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
          matters. Please take a moment to understand
          the commitment before deciding whether to
          become the witness.
        </p>

      </div>

      <section className="witness-invitation-page__card">

        <div className="witness-invitation-page__item">
          <h3>Commitment</h3>

          <p>{invitation.title}</p>
        </div>

        <div className="witness-invitation-page__item">
          <h3>Deadline</h3>

          <p>
            {new Date(
              invitation.deadlineAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="witness-invitation-page__item">
          <h3>Success Criteria</h3>

          <p>
            {invitation.successCriteria}
          </p>
        </div>

      </section>

      <section className="witness-invitation-page__info">

        <div className="witness-invitation-page__info-card">
          <h3>Why were you invited?</h3>

          <p>
            {invitation.creatorName} chose you because
            they trust your honest judgment. Your role
            is to verify whether this commitment was
            completed.
          </p>
        </div>

        <div className="witness-invitation-page__info-card">
          <h3>What will happen next?</h3>

          <p>
            If you accept this invitation, the challenge
            becomes active. When the challenge reaches
            its review stage, you'll receive a separate
            review invitation.
          </p>
        </div>

        <div className="witness-invitation-page__info-card">
          <h3>Privacy</h3>

          <p>
            This invitation is private. Your review is
            only used for accountability between you
            and the challenge creator.
          </p>
        </div>

      </section>

      <p className="witness-invitation-page__cta-note">
        Accepting this invitation does not submit a
        review. Your review will happen later when the
        challenge reaches the review stage.
      </p>

      {submitError && (
        <p className="witness-invitation-page__error">
          {submitError}
        </p>
      )}

      <div className="witness-invitation-page__form">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

      </div>

      <div className="witness-invitation-page__actions">

        <button
          type="button"
          className="witness-invitation-page__button"
          disabled={submitting}
          onClick={handleAccept}
        >
          {submitting
            ? "Accepting..."
            : "Accept Invitation"}
        </button>

        <button
          type="button"
          className="witness-invitation-page__button witness-invitation-page__button--secondary"
          disabled={submitting}
          onClick={handleDecline}
        >
          {submitting
            ? "Please wait..."
            : "Decline Invitation"}
        </button>

      </div>

    </div>
  </main>
);
};

export default WitnessInvitationPage;