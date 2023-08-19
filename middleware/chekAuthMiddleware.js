import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

export const chekAuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(ApiError.unauthorized("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return next(ApiError.unauthorized(error.message));
  }
};
