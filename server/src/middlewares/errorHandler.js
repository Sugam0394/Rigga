import logger from '../utils/logger.js'

export const errorHandler = (err, req, res, next) => {
  logger.error("GLOBAL ERROR", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (req.originalUrl.includes("/webhook")) {
    return res.status(statusCode).set("Content-Type", "text/xml").send(`
      <Response>
        <Message>System error 😅 try again</Message>
      </Response>
    `);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};