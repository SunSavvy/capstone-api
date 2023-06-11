import jwt from "jsonwebtoken";

export const VerifToken = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "Access denied. No token provided!",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
