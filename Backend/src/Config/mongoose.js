import mongoose from "mongoose";
import dotenv from "dotenv";
import { sampleSub } from "../../Seed/subscriptionData.js";

import { Subscription } from "../Models/subscription.schema.js";
dotenv.config();

main().catch((err) => console.log(err));

export async function main() {
  const uri = process.env.MONGO_URI;
  const connectionInstance = await mongoose.connect(uri);
  console.log(
    `Connected to database DataBase host: ${connectionInstance?.connection?.host}`
  );
}

