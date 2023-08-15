import { Router } from "express";
import {
  addDeviceToBasket,
  deleteDevicesFromBasket,
  getBasket,
} from "../controllers/basketController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";

const basketRouter = Router();

basketRouter.get("/", chekAuthMiddleware, getBasket);
basketRouter.post("/", chekAuthMiddleware, addDeviceToBasket);
basketRouter.delete("/", chekAuthMiddleware, deleteDevicesFromBasket);

export default basketRouter;
