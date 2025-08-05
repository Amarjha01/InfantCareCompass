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
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Allow any localhost port
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      
      // Allow the production domain
      if (origin === 'https://infantcarecompass.live') {
        return callback(null, true);
      }
      
      // Reject other origins
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "InfantCareCompass API is running!" });
});

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
}).catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
