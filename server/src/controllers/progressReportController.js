import progressReportService from "../services/progressReportService.js";
import progressEligibilityService
  from "../services/progressEligibilityService.js";


  
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

  if (
    error.message ===
    "Forbidden"
  ) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  if (
    error.message ===
    "Challenge not found"
  ) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

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

  if (
    error.message ===
    "Forbidden"
  ) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  if (
    error.message ===
    "Challenge not found"
  ) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  res.status(400).json({
    success: false,
    message: error.message,
  });
}
  };

  const getProgressEligibility = async (
  req,
  res
) => {
  try {

    const eligibility =
      await progressEligibilityService
        .getProgressEligibility({
          challengeId:
            req.params.id,

          userId:
            req.user.userId,
        });

    res.status(200).json({
      success: true,
      data: eligibility,
    });

   } catch (error) {

  if (
    error.message ===
    "Forbidden"
  ) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  if (
    error.message ===
    "Challenge not found"
  ) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }

  res.status(400).json({
    success: false,
    message: error.message,
  });
}
};

export default {
  submitProgressReport,
  getChallengeReports,
  getProgressEligibility
};