import { Router } from "express";
import userRouter from "./userRouter.js";
import deviceRouter from "./deviceRouter.js";
import basketRouter from "./basketRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import ratingRouter from "./ratingRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/basket", basketRouter);
router.use("/rating", ratingRouter);
router.use("/order", orderRouter);

export default router;
