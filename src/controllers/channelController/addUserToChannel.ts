import { Request, Response, NextFunction } from 'express';
import { AddUserToChannelOperationTypes, addUserToChannelOperation } from './operations';

interface AddUserToChannelRequest<T> extends Request {
  body: T;
}

export const addUserToChannel = async (
  req: AddUserToChannelRequest<AddUserToChannelOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { userId, channelId } = req.body;

  try {
    const channel = await addUserToChannelOperation({ userId, channelId });

    res.json(channel);
  } catch (error) {
    next(error);
  }
};
