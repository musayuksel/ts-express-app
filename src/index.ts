import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
