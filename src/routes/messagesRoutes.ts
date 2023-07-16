import express, { Response } from "express";
import { getAllMessages } from "../controllers/messagesController";

const router = express.Router();

router.get("/", getAllMessages);

export default router;
