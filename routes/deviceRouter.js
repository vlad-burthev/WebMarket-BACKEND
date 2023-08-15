import { Router } from "express";
import {
  createDevice,
  getAllDevices,
  getOneDevice,
} from "../controllers/deviceController.js";
import { chekRoleMiddleware } from "../middleware/chekRoleMiddleware.js";

const deviceRouter = Router();

deviceRouter.get("/", getAllDevices);
deviceRouter.get("/:slug", getOneDevice);
deviceRouter.post("/", chekRoleMiddleware("ADMIN"), createDevice);
deviceRouter.delete("/", chekRoleMiddleware("ADMIN"));

export default deviceRouter;
