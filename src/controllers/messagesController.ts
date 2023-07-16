import { Request, Response } from "express";
import messages from "../utils/mockMessages.json";

export const getAllMessages = (req: Request, res: Response) => {
  res.json(messages);
};

export const getMessageByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  const userMessages = messages.messages.filter(
    (message) => message.user_id === userId
  );

  res.json(userMessages);
};
