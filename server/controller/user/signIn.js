import { asyncHandler } from "../../utils/asyncHandler.js"; // Import the handler
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = asyncHandler(async (req, res, next) => {
    // Validate required fields
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
        return res.status(400).json({
            message: 'Missing required fields: email, password, and role are required'
        });
    }

    // Normalize email to lowercase for consistent comparison
    const normalizedEmail = email.toLowerCase().trim();

    // Validate TOKEN_SECRET_KEY is configured
    if (!process.env.TOKEN_SECRET_KEY) {
        console.error("TOKEN_SECRET_KEY is not configured in environment variables");
        return res.status(500).json({
            message: "Server configuration error: JWT secret key is missing",
            error: "Internal server configuration error"
        });
    }

    try {
        if (role === 'DOCTOR') {
            const doctor = await doctormondel.findOne({ email: normalizedEmail });
            if (!doctor) {
                return res.status(400).json({
                    message: 'Incorrect email or password'
                });
            }
            const isPasswordValid = await bcrypt.compare(password, doctor.password);

            if (isPasswordValid) {
                const tokendata = {
                    id: doctor._id,
                    email: doctor.email,
                    role: 'DOCTOR'
                };
                
                const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
                
                const tokenOption = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                };
                
                res.cookie("token", token, tokenOption).status(200).json({
                    message: "Login successful",
                    data: {
                        id: doctor._id,
                        email: doctor.email,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        role: 'DOCTOR'
                    },
                    token: token,
                    success: true,
                    error: false
                });
            } else {
                res.status(400).json({
                    message: "Incorrect email or password"
                });
            }

        } else {
            const user = await usermodel.findOne({ email: normalizedEmail });
            if (!user) {
                return res.status(400).json({
                    message: 'Incorrect email or password'
                });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const tokendata = {
                    id: user._id,
                    email: user.email,
                    role: 'USER'
                };
                
                const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
                
                const tokenOption = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                };
                
                res.cookie("token", token, tokenOption).status(200).json({
                    message: "Login successful",
                    data: {
                        id: user._id,
                        email: user.email,
                        kidName: user.kidName,
                        role: 'USER'
                    },
                    token: token,
                    success: true,
                    error: false
                });
            } else {
                res.status(400).json({
                    message: "Incorrect email or password"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during sign-in",
            error: error.message
        });
    }
});

export default signin;
