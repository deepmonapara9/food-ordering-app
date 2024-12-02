import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to the db"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

// /api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
