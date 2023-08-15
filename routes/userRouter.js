import { Router } from "express";
import { check, login, registration } from "../controllers/userController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";
import { chekRoleMiddleware } from "../middleware/chekRoleMiddleware.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/registration", registration);
userRouter.get("/auth", chekAuthMiddleware, check);
userRouter.delete("/deleteUser", chekRoleMiddleware("ADMIN"));

export default userRouter;
