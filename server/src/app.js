 import express from 'express'
 import cors from 'cors'
 import cookieParser from 'cookie-parser'

 const app = express();


 app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
 }))

 app.use(express.json({limit: "16kb"}))
 app.use(express.urlencoded({extended: true , limit: "16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser());



 // Importing routes

 import challengeRoutes from "./routes/challengeRoutes.js";
 import progressReportRoutes from "./routes/progressReportRoutes.js"
 import reviewSummaryRoutes from "./routes/reviewSummaryRoutes.js"
 import notificationRoutes from "./routes/notificationRoutes.js"
 import reviewLinkRoutes from "./routes/reviewLinkRoutes.js"
 import publicRoutes from "./routes/publicReviewRoutes.js"
 import reminderRoutes from "./routes/reminderRoutes.js";




   // Using routes

   app.use("/api", challengeRoutes);

   app.use("/api/progress-reports", progressReportRoutes);

   app.use("/api", reviewSummaryRoutes);

   app.use("/api", notificationRoutes);

   app.use("/api", reviewLinkRoutes);

   app.use("/api" , publicRoutes);

   app.use("/api" , reminderRoutes);











   

 // Global error handler — routes ke baad, export se pehle
app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message,
  });
});

export default app;


 