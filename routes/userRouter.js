import { Router } from "express";
import { login, registration } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/registration", registration);
userRouter.get("/auth");
userRouter.delete("/deleteUser");

export default userRouter;
