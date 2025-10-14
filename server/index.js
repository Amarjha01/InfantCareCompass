
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnect from './config/database/DBconnect.js';
import router from './routes/routes.js';
import githubWebhook from './routes/githubWebhook.js';


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
app.use('/api', router);



// Email Notification to Doctor
// app.post('/api/notify-doctor', async (req, res) => {
//   const { doctorId, channelName } = req.body;

//   if (!doctorId || !channelName) {
//     return res.status(400).json({ error: "Doctor ID and channel name are required." });
//   }

//   try {
//     const doctor = await doctormodel.findById(doctorId); // Assuming a Doctor model
//     const doctorEmail = doctor.email;

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: doctorEmail,
//       subject: 'Video Call Invitation',
//       text: `You have an incoming video call. Please join using the following link: http://localhost:5173/video-call${channelName}`,
//     };
// console.log('doctor email',doctorEmail);

//     await transporter.sendMail(mailOptions);
//     res.json({ message: "Doctor notified successfully via email." });
//   } catch (error) {
//     console.error("Error notifying doctor:", error);
//     res.status(500).json({ error: "Failed to notify doctor.", details: error.message });
//   }
// });

// GitHub webhook routes for handling repository events
app.use("/api/github", githubWebhook);

// Global error handling middleware
// 404 handler for undefined routes
app.use((req,res,next)=>{
  res.status(404).json({message:'Route Not Found'});
});

// 500 handler for server errors
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).json({message:'internal server error'});
});
// Database connection and server start
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});

