 import express from "express";

import invitationController
  from "../controllers/invitationController.js";

const router = express.Router();

router.get(
  "/witness/:token",
  invitationController.getInvitation
);

router.post(
  "/witness/:token/accept",
  invitationController.acceptInvitation
);
router.post(
  "/witness/:token/decline",
  invitationController.declineInvitation
);

export default router;