import { Request, Response } from "express";
import { Message } from "../models/message";

export const getAllMessages = async (req: Request, res: Response) => {
  const messages = await Message.findAll();
  res.json(messages);
};

export const getMessageByUserId = async (req: Request, res: Response) => {
  // TODO: implement this
  res.json("message by user id");
};

export const createMessage = async (req: Request, res: Response) => {
  const { content, UserId, ChannelId, attachment } = req.body;
  const newMessage = await Message.create({
    content,
    UserId,
    ChannelId,
    attachment: attachment || null,
  });
  res.json(newMessage);
};
