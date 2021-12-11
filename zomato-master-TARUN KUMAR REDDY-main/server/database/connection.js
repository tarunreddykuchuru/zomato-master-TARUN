import mongoose from "mongoose";
require("dotenv").config();
export default async () => {
  return mongoose.connect(process.env.mongo_url);
};
