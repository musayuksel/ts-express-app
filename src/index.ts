import express, { Request, Response } from "express";
import dotenv from "dotenv";
import healthCheckRoutes from "./routes/healthCheckRoutes";
import messagesRoutes from "./routes/messagesRoutes";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.use("/api/health-check", healthCheckRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
