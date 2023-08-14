import { Router } from "express";

const ratingRouter = Router();

ratingRouter.get("/:id");
ratingRouter.post("/");

export default ratingRouter;
