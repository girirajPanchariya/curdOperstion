import express from "express";
import dotenv from "dotenv";
import { connetdb } from "./other/db.js";
import { bookR } from "./Router/book.js";
import { UserRouter } from "./Router/user.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config(); // Load .env first
const app = express();
const PORT = process.env.PORT ||4000 // Fallback if PORT is undefined
app.use(cookieParser())
app.use(express.json());
app.use(cors())
app.use("/add",bookR)
app.use('/user',UserRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connetdb()
});
