import express, { Response } from "express";
import {
  getAllMessages,
  getMessageByUserId,
} from "../controllers/messagesController";

const router = express.Router();

router.get("/", getAllMessages);
router.get("/:userId", getMessageByUserId);

export default router;
