import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export const chekRoleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.unauthorized("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        return res.json({ message: "Not enough rights" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  };
};
