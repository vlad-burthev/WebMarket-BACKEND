import { Router } from "express";

const deviceRouter = Router();

deviceRouter.get("/");
deviceRouter.get("/:slug");
deviceRouter.post("/");
deviceRouter.delete("/");

export default deviceRouter;
