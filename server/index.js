import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import dbConnect from "./config/database/DBconnect.js";
import router from "./routes/routes.js";
import githubWebhook from "./routes/githubWebhook.js";

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://infantcarecompass.live",
    ], // React App URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

app.use("/api/github", githubWebhook);
//error handling 
app.use((req,res,next)=>{
  res.status(404).json({message:'Route Not Found'});
});
//500 error handling
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).json({message:'internal server error'});
});
// Database connection and server start
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
