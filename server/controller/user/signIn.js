import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Missing required fields: email, password, and role are required'
    });
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (!process.env.TOKEN_SECRET_KEY) {
    console.error("TOKEN_SECRET_KEY is not configured in environment variables");
    return res.status(500).json({
      message: "Server configuration error: JWT secret key is missing",
      error: "Internal server configuration error"
    });
  }

  try {
    const modelToUse = role === 'DOCTOR' ? doctormondel : role === 'USER' ? usermodel : null;

    if (!modelToUse) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    const user = await modelToUse.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const tokendata = {
      id: user._id,
      email: user.email,
      role
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };

    const responseData =
      role === 'DOCTOR'
        ? {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: 'DOCTOR'
          }
        : {
            id: user._id,
            email: user.email,
            kidName: user.kidName,
            role: 'USER'
          };

    return res.cookie("token", token, tokenOption).status(200).json({
      message: "Login successful",
      data: responseData,
      token,
      success: true,
      error: false
    });

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during sign-in",
      error: error.message
    });
  }
});

export default { signin };
