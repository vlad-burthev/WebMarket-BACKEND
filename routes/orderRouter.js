import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/:id");
orderRouter.post("/");
orderRouter.delete("/");

export default orderRouter;
