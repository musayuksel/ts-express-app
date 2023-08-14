import { Request, Response, NextFunction } from 'express';
import { Channel } from '../../models/channel';
import { User } from '../../models/user';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getUserChannels = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.currentUser?.username;

  try {
    const userWithChannels = await User.findOne({
      where: { userName: username },
      include: {
        model: Channel,
        through: {
          attributes: [], // if you don't want any extra info from the junction table
        },
      },
    });

    if (!userWithChannels) {
      throw new CustomError('User not found', 404);
    }

    res.json(userWithChannels?.dataValues.Channels);
  } catch (error) {
    next(error);
  }
};
