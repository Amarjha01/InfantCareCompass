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

// Routes
app.use("/api", router);

app.use("/api/github", githubWebhook);

// Database connection and server start
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
