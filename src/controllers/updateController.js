import { ObjectId } from "mongodb";
import { connectDB } from "../db.js";
import Joi from "joi";

export async function updateEmail(req, res) {
  const { userId } = req.params;
  const { email } = req.body;

  const updateSchema = Joi.object({
    email: Joi.string().required(),
  });
  const validation = updateSchema.validate({ email }, { abortEarly: false });
  if (validation.error) {
    const message = validation.error.details.map((detail) => detail.message);
    return res
      .status(422)
      .send({ error: "Failed to validate update", details: message });
  }

  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    const db = await connectDB();

    const token = req.headers.authorization?.replace("bearer ", "").trim();
    if (!token) {
      return res.status(401).send("Token is required");
    }

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send("Invalid session");
    }

    const fieldsToUpdate = {};
    if (email) fieldsToUpdate.email = email;

    const updateResult = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(session.userId) },
        { $set: fieldsToUpdate },
      );
    if (updateResult.modifiedCount === 0) {
      return res.status(404).send("User not authorized to update");
    }
    res.status(200).send("Email update succesfully");
  } catch (error) {
    console.error("Error to update the email", error);
    return res.status(500).send("Internal server error");
  }
}
