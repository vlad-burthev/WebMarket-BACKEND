import { Router } from "express";
import { addRating, getDeviceRating } from "../controllers/ratingController.js";

const ratingRouter = Router();

ratingRouter.get("/:id", getDeviceRating);
ratingRouter.post("/:id", addRating);

export default ratingRouter;
