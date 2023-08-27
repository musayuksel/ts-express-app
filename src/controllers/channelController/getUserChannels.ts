import { Request, Response, NextFunction } from 'express';
import { getUserChannelsOperation } from './operations';

export const getUserChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = {
      userName: req.currentUser?.username,
    };

    const userChannels = await getUserChannelsOperation(payload);

    res.json(userChannels);
  } catch (error) {
    next(error);
  }
};
