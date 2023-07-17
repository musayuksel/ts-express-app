import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import healthCheckRoutes from "./routes/healthCheckRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import {
  customError,
  globalErrorHandler,
} from "./middlewares/globalErrorMiddleware";
import { Sequelize } from "sequelize";

dotenv.config();
const PORT = parseInt(process.env.PORT || "3000");
const DB_URL = process.env.DB_URL || "postgres://localhost:5432/slack";

const app = express();
app.use(express.json());

app.use("/api/health-check", healthCheckRoutes);
app.use("/api/messages", messagesRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new customError(`Route ${req.originalUrl} not found!!!`, 404);
  next(error);
});

app.use(globalErrorHandler);

const connectDB = async () => {
  const sequelize = new Sequelize(DB_URL);
  try {
    await sequelize.authenticate();
    console.log(
      `Connected to ${sequelize.getDatabaseName()} postgres database`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
