import express, { Response } from "express";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.json({
    status: "ok",
    message: "Server is running",
  });
});

export default router;
