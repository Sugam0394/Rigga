import invitationService from "../services/invitationService.js";

const getInvitation = async (req, res, next) => {
  try {
    const { token } = req.params;

    const invitation =
      await invitationService.getInvitationDetails(
        token
      );

    res.status(200).json({
      success: true,
      invitation,
    });
  } catch (error) {
    next(error);
  }
};

const acceptInvitation = async (req, res, next) => {
  try {
    const { token } = req.params;

    const { name, phone } = req.body;


    if (!name || !phone) {
  return res.status(400).json({
    success: false,
    message: "Name and phone are required.",
  });
}

    const result =
      await invitationService.acceptInvitation({
        token,
        witness: {
          name,
          phone,
        },
      });

    res.status(200).json({
      success: true,
      message:
        "Invitation accepted successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const declineInvitation = async (req, res, next) => {
  try {
    const { token } = req.params;

    const result =
      await invitationService.declineInvitation({
        token,
      });

    res.status(200).json({
      success: true,
      message:
        "Invitation declined successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getInvitation,
  acceptInvitation,
  declineInvitation,
};