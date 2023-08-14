import { Router } from "express";
import {
  createType,
  deleteType,
  getTypes,
} from "../controllers/typeController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";

const typeRouter = Router();

typeRouter.get("/", getTypes);
typeRouter.post("/", chekAuthMiddleware, createType);
typeRouter.delete("/", chekAuthMiddleware, deleteType);

export default typeRouter;
