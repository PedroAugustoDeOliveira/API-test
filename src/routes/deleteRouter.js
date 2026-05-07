import { Router } from "express";
import { deleteUser } from "../controllers/deleteController.js";

const deleteRouter = Router();

deleteRouter.delete("/delete/:userId", deleteUser);

export default deleteRouter;
