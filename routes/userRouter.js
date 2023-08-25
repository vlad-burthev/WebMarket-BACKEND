import { Router } from "express";
import {
  check,
  deleteUser,
  login,
  registration,
  getAllUsers,
} from "../controllers/userController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";
import { chekRoleMiddleware } from "../middleware/chekRoleMiddleware.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/registration", registration);
userRouter.get("/auth", chekAuthMiddleware, check);
userRouter.post("/deleteUser", chekRoleMiddleware("ADMIN"), deleteUser);
userRouter.get("/", chekRoleMiddleware("ADMIN"), getAllUsers);

export default userRouter;
