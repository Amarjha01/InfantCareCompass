import nodemailer from "nodemailer";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const sendContactUsEmail = asyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields (This logic is unchanged)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Sender's email address from .env
      pass: process.env.EMAIL_PASS, // Sender's email app password from .env
    },
  });

  // Define email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email address
    to: "support@infantcarecompass.live", // Recipient email address
    subject: `Contact Us Query: ${subject}`,
    text: `
      You have received a new message from the Contact Us form:
      
      Name: ${name}
      Message: ${message}
    `,
    replyTo: email,
  };

  // Send the email. If this fails, asyncHandler will catch the error.
  await transporter.sendMail(mailOptions);

  // If the email sends successfully, send the success response.
  res.status(200).json({ success: true, message: "Message sent successfully!" });
});

export default sendContactUsEmail;
