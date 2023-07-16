import express, { Request, Response } from "express";
import dotenv from "dotenv";
import healthCheckRoutes from "./routes/healthCheckRoutes";
import messagesRoutes from "./routes/messagesRoutes";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();
app.use(express.json());

app.use("/api/health-check", healthCheckRoutes);
app.use("/api/messages", messagesRoutes);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
