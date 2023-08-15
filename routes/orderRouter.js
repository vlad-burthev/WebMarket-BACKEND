import { Router } from "express";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";
import {
  addDeviceToOrder,
  deleteDevicesFromOrder,
  getOrder,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.get("/", chekAuthMiddleware, getOrder);
orderRouter.post("/", chekAuthMiddleware, addDeviceToOrder);
orderRouter.delete("/", chekAuthMiddleware, deleteDevicesFromOrder);

export default orderRouter;
