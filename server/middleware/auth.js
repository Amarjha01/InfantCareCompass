import jwt from "jsonwebtoken";

function authtoken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Authorization token missing. Please login." });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token. Please login again." });
    return;
  }
}

export default authtoken;
