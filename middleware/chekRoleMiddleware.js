import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";
configDotenv();

export const chekRoleMiddleware = (role, next) => {
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
      console.log(decoded.role, role);
      if (decoded.role !== role) {
        return next(ApiError.unauthorized("Not enough rights"));
      }

      req.user = decoded;
      next();
    } catch (error) {
      return next(ApiError.badRequest("Not enough rights"));
    }
  };
};
