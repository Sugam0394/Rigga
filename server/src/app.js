 import express from 'express'
 import cors from 'cors'
 import cookieParser from 'cookie-parser'
 import path from 'path';
 import { fileURLToPath } from "url";

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

 const app = express();


 console.log("CORS_ORIGIN =", process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

 

 app.use(express.json({limit: "16kb"}))
 app.use(express.urlencoded({extended: true , limit: "16kb"}))
 app.use(express.static("public"))
 app.use(cookieParser());

 app.use("/uploads",express.static(path.join(__dirname,"..","public","uploads")));



 // Importing routes

 import challengeRoutes from "./routes/challengeRoutes.js";
 import progressReportRoutes from "./routes/progressReportRoutes.js"
 import reviewSummaryRoutes from "./routes/reviewSummaryRoutes.js"
 import notificationRoutes from "./routes/notificationRoutes.js"
 import reviewLinkRoutes from "./routes/reviewLinkRoutes.js"
 import publicRoutes from "./routes/publicReviewRoutes.js"
 import reminderRoutes from "./routes/reminderRoutes.js";
 import accountabilityRoutes from "./routes/accountabilityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userNotificationRoutes from "./routes/userNotificationRoutes.js"
 import router from './routes/witnessAnalyticsRoutes.js';
import aiInsight from './routes/aiInsightRoutes.js';
import aiNarrative from './routes/aiNarrativeRoutes.js';
import aiCouch from './routes/aiCouchRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
console.log("History routes loaded");


   // Using routes

   app.use("/api", challengeRoutes);

   app.use("/api", progressReportRoutes);

   app.use("/api", reviewSummaryRoutes);

   app.use("/api", notificationRoutes);

   app.use("/api", reviewLinkRoutes);

   app.use("/api" , publicRoutes);

   app.use("/api" , reminderRoutes);

   app.use("/api" , accountabilityRoutes)

   app.use("/api" , dashboardRoutes)

   app.use("/api" , userRoutes)

   app.use("/api" , authRoutes)

   app.use("/api" , userNotificationRoutes)

   app.use("/api" , router)

   app.use('/api' , aiInsight)

   app.use("/api" , aiNarrative)

   app.use("/api" , aiCouch )

   app.use("/api" , invitationRoutes)

   app.use("/api", profileRoutes);

   app.use("/api", settingsRoutes);
  
   app.use( "/api", historyRoutes);








   

 // Global error handler — routes ke baad, export se pehle
 app.use((err, req, res, next) => {
  const status =
    err.status ||
    err.statusCode ||
    500;

  res.status(status).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

export default app;


 