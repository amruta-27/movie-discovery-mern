import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is missing. Wishlist persistence will not work.");
    return;
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
}
