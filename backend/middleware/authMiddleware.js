const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Request Headers:", req.headers);
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("Middleware Token received:", token);

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        console.log("Decoded token:", decoded);
        req.user = decoded;
        req.session.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
