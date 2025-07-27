import jwt from 'jsonwebtoken';


async function authtoken(req, resp, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return resp.status(401).json({
                message: 'please login'
            })
        } else {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
                console.log("token veryfication error:", err);
                console.log("token veryfication decoded:", decoded);

                if (err) {
                    console.log("error auth", err);
                    return resp.status(401).json({
                        message: 'please login'
                    })
                } else {
                    req.id = decoded.id;
                    console.log('id:', req.id)
                    next();
                }

            })
        }
    } catch (error) {
        return resp.status(400).json({
            message: error.message || error, // Log the error message instead of the whole error object
            data: [],
            error: true,
            success: false,
        });
    }
}
export default authtoken;