import Joi from "joi";
import { connectDB } from "../db.js";
import bcrypt from "bcrypt";

export async function postRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Password must match",
    }),
  });

  const validation = registerUserSchema.validate(
    { name, email, password, confirmPassword },
    { abortEarly: false },
  );
  if (validation.error) {
    const message = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(message);
  }

  try {
    const db = await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToInsert = {
      name,
      email,
      password: hashedPassword,
    };

    const existUser = await db.collection("users").findOne({ email });
    if (existUser) {
      return res.status(409).send("Email alredy resgistered");
    }

    const insertUser = await db.collection("users").insertOne(userToInsert);
    if (!insertUser) {
      return res.status(500).send("Error creatig user");
    }

    res.status(201).send({ message: "User created" });
  } catch (error) {
    console.error("Complete error", error);
    res.status(500).send(error);
  }
}
