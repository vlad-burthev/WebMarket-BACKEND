import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export const decodeToken = (token) => {
  const splitToken = token.split(" ")[1];
  const user = jwt.verify(splitToken, process.env.SECRET_KEY);
  return user;
};
