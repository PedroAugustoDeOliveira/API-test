import express from "express";

import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();

await connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
