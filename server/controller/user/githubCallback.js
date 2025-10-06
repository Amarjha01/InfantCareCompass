import usermodel from "../../models/user/user.js";
import doctormodel from "../../models/user/doctorSchema.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import axios from "axios";

const githubCallback = asyncHandler(async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ message: "GitHub authorization code is missing" });
    }

    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        console.error("GitHub OAuth credentials are missing in environment variables");
        return res.status(500).json({ message: "Server configuration error" });
    }

    // 1. Exchange code for access token
    const tokenResponse = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        },
        {
            headers: { Accept: "application/json" }
        }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
        return res.status(400).json({ message: "Failed to get GitHub access token" });
    }

    // 2. Get user data from GitHub API
    const githubUserResponse = await axios.get(`https://api.github.com/user`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const githubEmailResponse = await axios.get(`https://api.github.com/user/emails`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const primaryEmail = githubEmailResponse.data.find(e => e.primary)?.email;
    if (!primaryEmail) {
        return res.status(400).json({ message: "GitHub email not found or not public" });
    }

    const normalizedEmail = primaryEmail.toLowerCase().trim();
    let userData, detectedRole;

    // 3. Check in DOCTOR model
    userData = await doctormodel.findOne({ email: normalizedEmail });
    if (userData) {
        detectedRole = "DOCTOR";
    } else {
        // 4. Check in USER model
        userData = await usermodel.findOne({ email: normalizedEmail });
        if (userData) {
            detectedRole = "USER";
        }
    }

    // 5. If not found in either
    if (!userData) {  
        return res.redirect(
            `${process.env.FRONTEND_URL}/registration`
        )
    }

    // 6. JWT signing
    const tokendata = {
        id: userData._id,
        email: userData.email,
        role: detectedRole
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

    const tokenOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // "strict" can cause issues with cross-site redirects
        path: "/"
    };

    // 7. Prepare response data
    const responseData = {
        id: userData._id,
        email: userData.email,
        role: detectedRole
    };

    if (detectedRole === "DOCTOR") {
        responseData.firstName = userData.firstName;
        responseData.lastName = userData.lastName;
    } else if (detectedRole === "USER") {
        responseData.kidName = userData.kidName;
    }

    // 8. Send response
    console.log(responseData);
    return res
        .cookie("token", token, tokenOptions)
        .redirect(
            `${process.env.FRONTEND_URL}/oauth-success`
        );
});

export default githubCallback;