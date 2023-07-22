import { Request, Response } from "express";
import { Channel } from "../models/channel";
import { User } from "../models/user";

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

export const addUserToChannel = async (req: Request, res: Response) => {
  const { userId, channelId } = req.body;
  const user = await User.findByPk(userId);
  const channel = await Channel.findByPk(channelId);
  //   console.log({ user, channel });
  if (!channel) {
    throw new Error("Channel not found"); //TODO: create custom error
  }
  await channel.addUser(userId);
  res.json(channel);
};
