import express, { Response } from "express";
import {
  createNewChannel,
  getAllChannels,
} from "../controllers/channelControllers";

const router = express.Router();

router.get("/", async (req, res: Response, next) => {
  try {
    await getAllChannels(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res: Response, next) => {
  try {
    await createNewChannel(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
