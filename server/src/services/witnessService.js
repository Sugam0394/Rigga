import challengeRepository from "../repositories/challengeRepositories.js";

import invitationRepository from "../repositories/invitationRepository.js";

import appealRepository from "../repositories/appealRepository.js";

import witnessTimelineService from "./witnessTimelineService.js";

const getInvitationStatus = async ({
  challengeId,
  userId,
}) => {
  // W3.5
};

const getWitnessStatus = async ({
  challengeId,
  userId,
}) => {
  // W3.5
};

const getReviewStatus = async ({
  challengeId,
  userId,
}) => {
  // W3.5
};

const getAppealStatus = async ({
  challengeId,
  userId,
}) => {
  // W3.5
};

const getWitnessTimeline = async ({
  challengeId,
  userId,
}) => {
  // W3.5
};

export default {
  getInvitationStatus,
  getWitnessStatus,
  getReviewStatus,
  getAppealStatus,
  getWitnessTimeline,
};