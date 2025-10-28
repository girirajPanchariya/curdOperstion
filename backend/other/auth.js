import jwt from 'jsonwebtoken';

export const authenticates = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token is not provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;  // usually stores: { id: user._id }
        next();

    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};
