import { Router } from "express";
import {
  createType,
  deleteType,
  getTypes,
} from "../controllers/typeController.js";
import { chekRoleMiddleware } from "../middleware/chekRoleMiddleware.js";

const typeRouter = Router();

typeRouter.get("/", getTypes);
typeRouter.post("/create", chekRoleMiddleware("ADMIN"), createType);
typeRouter.post("/delete", chekRoleMiddleware("ADMIN"), deleteType);

export default typeRouter;
