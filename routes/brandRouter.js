import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
} from "../controllers/brandController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";

const brandRouter = Router();

brandRouter.get("/", getBrands);
brandRouter.post("/", chekAuthMiddleware, createBrand);
brandRouter.delete("/", chekAuthMiddleware, deleteBrand);

export default brandRouter;
