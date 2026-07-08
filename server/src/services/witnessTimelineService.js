const createTimelineEvent = ({
  type,
  timestamp,
  actor = null,
  metadata = {},
}) => ({
  type,
  timestamp,
  actor,
  metadata,
});

const buildInvitationEvents = ({
  invitation,
}) => {
  const events = [];

  if (!invitation) {
    return events;
  }

  events.push(
    createTimelineEvent({
      type: "INVITATION_CREATED",
      timestamp:
        invitation.createdAt,
      actor: "SYSTEM",
    })
  );

  if (
    invitation.viewedAt
  ) {
    events.push(
      createTimelineEvent({
        type: "INVITATION_VIEWED",
        timestamp:
          invitation.viewedAt,
        actor: "WITNESS",
      })
    );
  }

  switch (
    invitation.status
  ) {
    case "ACCEPTED":
      events.push(
        createTimelineEvent({
          type:
            "INVITATION_ACCEPTED",
          timestamp:
            invitation.updatedAt,
          actor: "WITNESS",
        })
      );
      break;

    case "DECLINED":
      events.push(
        createTimelineEvent({
          type:
            "INVITATION_DECLINED",
          timestamp:
            invitation.updatedAt,
          actor: "WITNESS",
        })
      );
      break;

    case "SUPERSEDED":
      events.push(
        createTimelineEvent({
          type:
            "INVITATION_SUPERSEDED",
          timestamp:
            invitation.updatedAt,
          actor: "SYSTEM",
        })
      );
      break;

    default:
      break;
  }

  return events;
};

const buildChallengeEvents = ({
  challenge,
}) => {
  const events = [];

  if (!challenge) {
    return events;
  }

  if (
    challenge.status !==
    "PENDING_WITNESS"
  ) {
    events.push(
      createTimelineEvent({
        type:
          "CHALLENGE_ACTIVATED",
        timestamp:
          challenge.startedAt ??
          challenge.updatedAt,
        actor: "SYSTEM",
      })
    );
  }

  if (
    challenge.status ===
      "UNDER_REVIEW" ||
    challenge.status ===
      "REJECTED" ||
    challenge.status ===
      "COMPLETED" ||
    challenge.status ===
      "FAILED" ||
    challenge.status ===
      "APPEALED"
  ) {
    events.push(
      createTimelineEvent({
        type:
          "REVIEW_OPENED",
        timestamp:
          challenge.reviewStartedAt ??
          challenge.updatedAt,
        actor: "SYSTEM",
      })
    );
  }

  if (
    challenge.witness
      ?.decision
  ) {
    events.push(
      createTimelineEvent({
        type:
          "REVIEW_SUBMITTED",
        timestamp:
          challenge.witness
            .decidedAt,
        actor: "WITNESS",
        metadata: {
          decision:
            challenge.witness
              .decision,
        },
      })
    );

    if (
      challenge.witness
        .decision ===
      "APPROVED"
    ) {
      events.push(
        createTimelineEvent({
          type:
            "CHALLENGE_APPROVED",
          timestamp:
            challenge.witness
              .decidedAt,
          actor: "WITNESS",
        })
      );
    }

    if (
      challenge.witness
        .decision ===
      "REJECTED"
    ) {
      events.push(
        createTimelineEvent({
          type:
            "CHALLENGE_REJECTED",
          timestamp:
            challenge.witness
              .decidedAt,
          actor: "WITNESS",
        })
      );
    }
  }

  return events;
};

const buildAppealEvents = ({
  appeal,
}) => {
  const events = [];

  if (!appeal) {
    return events;
  }

  events.push(
    createTimelineEvent({
      type:
        "APPEAL_SUBMITTED",
      timestamp:
        appeal.createdAt,
      actor: "USER",
    })
  );

  if (
    appeal.decidedAt
  ) {
    events.push(
      createTimelineEvent({
        type:
          "APPEAL_DECIDED",
        timestamp:
          appeal.decidedAt,
        actor: "WITNESS",
      })
    );
  }

  return events;
};

const buildWitnessTimeline = ({
  challenge = null,
  invitation = null,
  appeal = null,
}) => {
  const events = [
    ...buildInvitationEvents({
      invitation,
    }),

    ...buildChallengeEvents({
      challenge,
    }),

    ...buildAppealEvents({
      appeal,
    }),
  ];

  events.sort(
    (a, b) =>
      new Date(
        a.timestamp
      ) -
      new Date(
        b.timestamp
      )
  );

  return {
    events,
  };
};

export default {
  buildWitnessTimeline,
};