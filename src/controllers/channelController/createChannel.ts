import { Request, Response, NextFunction } from 'express';

import { createChannelOperation, CreateChannelOperationTypes } from './operations';

interface CreateChannelRequest<T> extends Request {
  body: T;
}

export const createChannel = async (
  req: CreateChannelRequest<CreateChannelOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = {
      channelName: req.body.channelName,
    };

    const channel = await createChannelOperation(payload);

    res.json(channel);
  } catch (error) {
    next(error);
  }
};
