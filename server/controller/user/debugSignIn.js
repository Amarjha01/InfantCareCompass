import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';

const debugSignIn = asyncHandler(async (req, res, next) => {
    console.log("=== DEBUG SIGN-IN REQUEST ===");
    console.log("Request body:", req.body);
    
    const { email, password, role } = req.body;
    
    if (!email || !password || !role) {
        return res.status(400).json({
            message: 'Missing required fields',
            received: { email: !!email, password: !!password, role: !!role }
        });
    }

    try {
        let user;
        let userType;
        
        if (role === 'DOCTOR') {
            user = await doctormondel.findOne({ email: email.toLowerCase() });
            userType = 'Doctor';
        } else {
            user = await usermodel.findOne({ email: email.toLowerCase() });
            userType = 'User';
        }
        
        if (!user) {
            console.log(`${userType} not found for email:`, email);
            return res.status(400).json({
                message: `${userType} not found`,
                email: email,
                debug: 'Email not found in database'
            });
        }
        
        console.log(`${userType} found:`, user.email);
        console.log(`Stored password hash length:`, user.password?.length);
        console.log(`Provided password length:`, password.length);
        
        // Test password comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Password comparison result:`, isPasswordValid);
        
        if (!isPasswordValid) {
            // Additional debugging
            console.log(`Password verification failed`);
            console.log(`Stored hash:`, user.password);
            console.log(`Provided password:`, password);
            
            return res.status(400).json({
                message: "Invalid password",
                debug: {
                    storedHashPreview: user.password?.substring(0, 10) + "...",
                    passwordLength: password.length,
                    hashLength: user.password?.length
                }
            });
        }
        
        res.status(200).json({
            message: "Debug successful - credentials are valid",
            user: {
                id: user._id,
                email: user.email,
                role: role
            }
        });
        
    } catch (error) {
        console.error("Debug error:", error);
        res.status(500).json({
            message: "Debug error occurred",
            error: error.message
        });
    }
});

export default debugSignIn;
