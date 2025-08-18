import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormodel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    // Validate fields
    if (!email || !password || !role) {
        return res.status(400).json({
            message: 'Missing required fields: email, password, and role are required'
        });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedRole = role.toUpperCase();

    if (!process.env.TOKEN_SECRET_KEY) {
        console.error("TOKEN_SECRET_KEY is not configured in environment variables");
        return res.status(500).json({
            message: "Server configuration error: JWT secret key is missing",
            error: "Internal server configuration error"
        });
    }

    try {
        let userData;

        if (normalizedRole === 'DOCTOR') {
            userData = await doctormodel.findOne({ email: normalizedEmail });
        } else if (normalizedRole === 'USER') {
            userData = await usermodel.findOne({ email: normalizedEmail });
        } else {
            return res.status(400).json({ message: "Invalid role provided" });
        }

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const tokendata = {
            id: userData._id,
            email: userData.email,
            role: normalizedRole
        };

        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        const responseData = {
            id: userData._id,
            email: userData.email,
            role: normalizedRole
        };

        if (normalizedRole === 'DOCTOR') {
            responseData.firstName = userData.firstName;
            responseData.lastName = userData.lastName;
        } else if (normalizedRole === 'USER') {
            responseData.kidName = userData.kidName;
        }

        return res
            .cookie("token", token, tokenOptions)
            .status(200)
            .json({
                message: "Login successful",
                data: responseData,
                token: token,
                success: true,
                error: false
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during sign-in",
            error: error.message
        });
    }
});

export default signin;
