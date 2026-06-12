 import cron from "node-cron";

import challengeRepository from "../repositories/challengeRepositories.js";

import lifecycleService from "../services/lifecycleService.js";

import {
  CHALLENGE_STATUS,
} from "../constants/challengeStatus.js";

const registerLifecycleJob = () => {
  cron.schedule(
    "0 * * * *",
    async () => {
      try {
        console.log(
          "[LIFECYCLE JOB START]"
        );

        const challenges =
          await challengeRepository.getExpiredActiveChallenges(
            new Date()
          );

        for (const challenge of challenges) {
          const updated =
            await lifecycleService.evaluateChallengeLifecycle(
              challenge
            );

          if (
            updated?.status ===
            CHALLENGE_STATUS.UNDER_REVIEW
          ) {
            console.log(
              `[CHALLENGE MOVED TO UNDER_REVIEW] ${challenge._id}`
            );
          }
        }

        console.log(
          `[LIFECYCLE JOB COMPLETE] ${challenges.length}`
        );
      } catch (error) {
        console.error(
          "[LIFECYCLE JOB ERROR]",
          error
        );
      }
    }
  );

  console.log(
    "[LIFECYCLE JOB REGISTERED]"
  );
};

export default registerLifecycleJob;
  