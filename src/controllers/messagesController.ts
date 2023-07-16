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

export const createMessage = (req: Request, res: Response) => {
  const { content, user_id, time_stamp, attachment } = req.body;
  const newId = +messages.messages.length + 1 + "";
  const newMessage = {
    id: newId,
    content,
    user_id,
    time_stamp,
    attachment: attachment || null,
  };
  messages.messages.push(newMessage);
  res.json(newMessage);
};
