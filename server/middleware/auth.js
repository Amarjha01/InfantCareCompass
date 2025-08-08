import jwt from 'jsonwebtoken';
import User from '../models/user/user.js';

async function authtoken(req, res, next) {
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization token missing. Please login.'
            });
        }

        // Extract token from Bearer format or use directly
        let token;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        } else {
            token = authHeader;
        }

        // Validate token format before verification
        if (!token || token.split('.').length !== 3) {
            return res.status(401).json({
                message: 'Invalid token format. Please provide a valid JWT token.'
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err.name, err.message);
                
                let errorMessage = 'Invalid or expired token.';
                if (err.name === 'TokenExpiredError') {
                    errorMessage = 'Token has expired. Please login again.';
                } else if (err.name === 'JsonWebTokenError') {
                    errorMessage = 'Invalid token format. Please provide a valid token.';
                }
                
                return res.status(401).json({
                    message: errorMessage
                });
            }

            const userId = decoded?.id || decoded?.tokendata?.id;
            if (!userId) {
                return res.status(403).json({ 
                    message: 'Token is missing required user information.' 
                });
            }

            // Fetch the user from database and attach to request
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({
                    message: 'User not found. Please login again.'
                });
            }

            req.user = user;
            next();
        });

    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({
            message: 'Authentication error occurred.',
            error: true,
            success: false
        });
    }
}

export default authtoken;
