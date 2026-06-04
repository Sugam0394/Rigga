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

   // Using routes

   app.use("/api", challengeRoutes);

   app.use("/api/progress-reports", progressReportRoutes);

 



 export default app