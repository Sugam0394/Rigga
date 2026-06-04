import checkpointRepository
  from "../repositories/checkPointRepository.js";

const calculateDurationDays = (
  startDate,
  endDate
) => {
  const start =
    new Date(startDate);

  const end =
    new Date(endDate);

  const diffTime =
    end.getTime() -
    start.getTime();

  return (
    Math.floor(
      diffTime /
      (1000 * 60 * 60 * 24)
    ) + 1
  );
};

const getCheckpointCount = (
  durationDays
) => {

  if (durationDays === 1) {
    return 1;
  }

  if (
    durationDays >= 2 &&
    durationDays <= 14
  ) {
    return 1;
  }

  if (
    durationDays >= 15 &&
    durationDays <= 30
  ) {
    return 2;
  }

  if (
    durationDays >= 31 &&
    durationDays <= 60
  ) {
    return 3;
  }

  return 0;
};

const generateCheckpointDays = (
  durationDays,
  checkpointCount
) => {

  if (checkpointCount === 1) {
    return [durationDays];
  }

  if (checkpointCount === 2) {
    return [
      Math.ceil(durationDays / 2),
      durationDays,
    ];
  }

  if (checkpointCount === 3) {
    return [
      Math.ceil(durationDays / 3),
      Math.ceil(
        (durationDays * 2) / 3
      ),
      durationDays,
    ];
  }

  return [];
};

const generateScheduledDates = (
  startDate,
  checkpointDays
) => {

  return checkpointDays.map(
    (day) => {

      const date =
        new Date(startDate);

      date.setDate(
        date.getDate() +
        (day - 1)
      );

      return date;
    }
  );
};


 const createCheckpoints = async ({
  challengeId,
  startDate,
  endDate,
}) => {

  const durationDays =
    calculateDurationDays(
      startDate,
      endDate
    );

  const checkpointCount =
    getCheckpointCount(
      durationDays
    );

    const checkpointDays =
  generateCheckpointDays(
    durationDays,
    checkpointCount
  );

 const scheduledDates =
  generateScheduledDates(
    startDate,
    checkpointDays
  );



  const checkpoints =  scheduledDates.map(
    (scheduledDate, index) => ({
      challengeId,
      checkpointNumber:
        index + 1,
      scheduledDate,
    })
  );

  const savedCheckpoints =
  await checkpointRepository
    .createMany(
      checkpoints
    );

return savedCheckpoints;

 

 

 
};

export default {
  createCheckpoints,
  calculateDurationDays,
  getCheckpointCount,
};