export const errorHandler = (err, req, res, next) => {
  console.error("❌ ERROR:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // 🔥 TWILIO SPECIAL RESPONSE
  if (req.originalUrl.includes("/webhook")) {
    res.set("Content-Type", "text/xml");

    return res.status(statusCode).send(`
      <Response>
        <Message>System error 😅 try again</Message>
      </Response>
    `);
  }

  // normal API response
  res.status(statusCode).json({
    success: false,
    message,
  });
};