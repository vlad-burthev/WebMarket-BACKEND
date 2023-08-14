import { Router } from "express";

const basketRouter = Router();

basketRouter.get("/:user_id");
basketRouter.post("/:user_id");
basketRouter.delete("/:user_id/:device_id");

export default basketRouter;
