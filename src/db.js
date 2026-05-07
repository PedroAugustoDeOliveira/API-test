import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DATABASE;
const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Error do connect do database", error);
  }
}
