import { Request, Response } from "express";
import { Channel } from "../models/channel";

export const getAllChannels = async (req: Request, res: Response) => {
  const channels = await Channel.findAll();
  res.json(channels);
};

export const createNewChannel = async (req: Request, res: Response) => {
  const { channelName } = req.body;
  const channel1 = await Channel.create({
    channelName,
  });

  res.json(channel1);
};
