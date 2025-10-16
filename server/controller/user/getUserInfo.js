// server/controller/user/getUserInfo.js

import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormodel from "../../models/user/doctorSchema.js";

const getUserInfo = asyncHandler(async (req, res) => {
    // Debug: log cookies and headers
    console.log("getUserInfo cookies:", req.cookies);
    console.log("getUserInfo headers:", req.headers);

    // The 'authtoken' middleware should have already attached the user data 
    // to req.user (or req.userId/req.role) after verifying the JWT from the cookie.
    
    // We assume req.userId and req.role are available here.
    const userId = req.userId; 
    const role = req.role;

    if (!userId || !role) {
        return res.status(401).json({ 
            message: "Authentication failed. Please log in again.",
            cookies: req.cookies // Add cookies to response for debugging
        });
    }

    let userData;

    if (role === 'DOCTOR') {
        userData = await doctormodel.findById(userId).select('-password');
    } else if (role === 'USER' || role === 'PARENTS') {
        // Map PARENTS to USER for database lookup, or check based on role logic
        userData = await usermodel.findById(userId).select('-password');
    } else {
        return res.status(400).json({ message: "Invalid user role." });
    }

    if (!userData) {
        return res.status(404).json({ message: "User data not found." });
    }

    // Prepare response data similar to your sign-in response
    const responseData = {
        id: userData._id,
        email: userData.email,
        role: role,
    };

    if (role === 'DOCTOR') {
        responseData.firstName = userData.firstName;
        responseData.lastName = userData.lastName;
    } else if (role === 'USER' || role === 'PARENTS') {
        responseData.kidName = userData.kidName;
    }

    // Return the user data as a JSON response
    return res.status(200).json({
        message: "User session active",
        data: responseData,
        success: true,
        error: false
    });
});

export default getUserInfo;