import express from "express";

import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db.js";

import resgiterRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import deleteRouter from "./routes/deleteRouter.js";

const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();

await connectDB();
app.use(resgiterRouter);
app.use(loginRouter);
app.use(deleteRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
