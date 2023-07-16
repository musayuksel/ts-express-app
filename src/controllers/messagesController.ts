import { Request, Response } from "express";
import messages from "../utils/mockMessages.json";

export const getAllMessages = (req: Request, res: Response) => {
  res.json(messages);
};
