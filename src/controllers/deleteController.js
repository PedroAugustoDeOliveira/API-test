import { ObjectId } from "mongodb";
import { connectDB } from "../db.js";

export async function deleteUser(req, res) {
  const { userId } = req.params;
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user");
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

    const deleteUser = await db.collection("users").deleteOne({
      _id: new ObjectId(session.userId),
    });
    if (deleteUser.deletedCount === 0) {
      return res.status(404).send("User not found or not authorized to delete");
    }

    res.status(200).send("User delete successfully");
  } catch (error) {
    console.error("Error deleting User", error);
    return res.status(500).send("Interbal server error");
  }
}
