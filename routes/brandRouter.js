import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getBrands,
} from "../controllers/brandController.js";
import { chekAuthMiddleware } from "../middleware/chekAuthMiddleware.js";
import { chekRoleMiddleware } from "../middleware/chekRoleMiddleware.js";

const brandRouter = Router();

brandRouter.get("/", getBrands);
brandRouter.post("/create", chekRoleMiddleware("ADMIN"), createBrand);
brandRouter.post("/delete", chekRoleMiddleware("ADMIN"), deleteBrand);

export default brandRouter;
