import express, { Response } from "express";
import {
  addUserToChannel,
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
// Add new user to channel
router.post("/addUser", async (req, res: Response, next) => {
  try {
    await addUserToChannel(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
