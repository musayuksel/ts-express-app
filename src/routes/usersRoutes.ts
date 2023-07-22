import express, { Response } from "express";
import { createNewUser, getAllUsers } from "../controllers/usersController";

const router = express.Router();

router.get("/", async (req, res: Response, next) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res: Response, next) => {
  try {
    await createNewUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
