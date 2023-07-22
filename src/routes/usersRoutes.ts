import express, { Response } from "express";
import { createNewUser } from "../controllers/usersController";

const router = express.Router();

router.post("/", async (req, res: Response, next) => {
  try {
    await createNewUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
