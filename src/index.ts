import express, { Request, Response } from "express";
import dotenv from "dotenv";
import healthCheckRoutes from "./routes/healthCheckRoutes";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.use("/api/health-check", healthCheckRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
