import { Router } from "express";
import { postRegister } from "../controllers/resgisterController.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const resgiterRouter = Router();

resgiterRouter.post("/register", validateRegister, postRegister);

export default resgiterRouter;
