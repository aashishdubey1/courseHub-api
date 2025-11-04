import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_URL: process.env.DB_URL,
};
