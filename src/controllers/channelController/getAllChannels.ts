import { Request, Response } from "express";
import { Channel } from "../../models/channel";
import { CustomError } from '../../middlewares/middleware';

export const getAllChannels = async (req: Request, res: Response) => {
  try {
    const channels = await Channel.findAll();
    res.json(channels);

  } catch (error) {
    throw new CustomError("Something went wrong", 500);
  }
};

