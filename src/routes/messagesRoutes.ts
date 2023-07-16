import express, { Response } from "express";
import {
  getAllMessages,
  getMessageByUserId,
  createMessage,
} from "../controllers/messagesController";

import { logBody } from "../middlewares/messageMiddleware";

const router = express.Router();

router.get("/", getAllMessages);
router.get("/:userId", getMessageByUserId);
router.post("/", logBody, createMessage);

export default router;
