import { Router } from "express";
import { updateEmail } from "../controllers/updateController.js";

const updateRouter = Router();

updateRouter.put("/update/:userId", updateEmail);

export default updateRouter;
