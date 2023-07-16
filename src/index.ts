import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import healthCheckRoutes from "./routes/healthCheckRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import {
  customError,
  globalErrorHandler,
} from "./middlewares/globalErrorMiddleware";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();
app.use(express.json());

app.use("/api/health-check", healthCheckRoutes);
app.use("/api/messages", messagesRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: "Route not found",
  // });
  const error = new customError(`Route ${req.originalUrl} not found!!!`, 404);
  next(error);
});
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
