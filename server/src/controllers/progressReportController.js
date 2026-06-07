import progressReportService from "../services/progressReportService.js";

const submitProgressReport = async (
  req,
  res
) => {
  try {
 const report =
  await progressReportService
    .submitProgressReport({
      challengeId:
        req.body.challengeId,

      notes:
        req.body.notes,

      imageUrl:
        req.body.imageUrl,

      userId:
        req.user.userId,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  submitProgressReport,
};