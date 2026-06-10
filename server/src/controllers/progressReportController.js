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
  req.file
    ? `/uploads/${req.file.filename}`
    : null,

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

const getChallengeReports = async (req, res) => {
    try {
      const reports =
        await progressReportService
          .getChallengeReports(
            req.params.id,
            req.user.userId
          );

      res.status(200).json({
        success: true,
        data: reports,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export default {
  submitProgressReport,
  getChallengeReports
};