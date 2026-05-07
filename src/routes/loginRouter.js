import { Router } from "express";
import { postLogin, getSession } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", postLogin);
loginRouter.get("/login/session", getSession);

export default loginRouter;
