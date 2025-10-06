import jwt from 'jsonwebtoken';

const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.token;
        
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization token missing. Please login.'
            });
        }

        let token;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        } else {
            token = authHeader;
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const role = decoded?.role;
        
        if (role && role.toLowerCase() === 'admin') {
            req.tokendata = decoded; // Attach decoded token data for use in controllers
            return next();
        } else {
            return res.status(403).json({
                message: "Access denied. Admin privileges required.",
                error: true
            });
        }
    } catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: true
        });
    }
};

export default isAdmin; 