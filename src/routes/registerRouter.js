import { Router } from "express";
import { postRegister } from "../controllers/resgisterController.js";

const resgiterRouter = Router();

resgiterRouter.post("/register", postRegister);

export default resgiterRouter;
