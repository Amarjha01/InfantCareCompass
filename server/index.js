import express from 'express';
// import nodemailer from 'nodemailer';
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

// import doctormodel from './models/user/doctorSchema.js'; 
import dbConnect from './config/database/DBconnect.js'; // Replace with actual DB connect
import router from './routes/routes.js'; // Routes if needed


const PORT = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173' , "https://infantcarecompass.live"], // React App URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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

// Database connection and server start
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});
