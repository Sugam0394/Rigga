import logger from "../utils/logger.js";

export const retryAsync = async (fn, retries = 3, delay = 2000) => {
  try {
    return await fn();
  } catch (error) {

    if (retries === 0) {
      logger.error("❌ Retry failed completely", {
        error: error.message
      });
      throw error;
    }

    logger.warn("⚠️ Retry attempt...", {
      retriesLeft: retries,
      error: error.message
    });

    // wait before retry
    await new Promise(res => setTimeout(res, delay));

    return retryAsync(fn, retries - 1, delay);
  }
};