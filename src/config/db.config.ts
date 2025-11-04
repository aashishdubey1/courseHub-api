import mongoose from "mongoose";
import serverConfig from "./serverConfig";

export default async function connectToDb() {
  try {
    await mongoose.connect(serverConfig.DB_URL!);
    console.log("Db Connected");
  } catch (error) {
    console.log("Error while connecting db", error);
  }
}
