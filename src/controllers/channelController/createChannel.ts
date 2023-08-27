import { Request, Response, NextFunction } from 'express';

import { createChannelOperation, CreateChannelOperationTypes } from './operations';
import { formatResponse } from '../../utils';

interface CreateChannelRequest<T> extends Request {
  body: T;
}

export const createChannel = async (
  req: CreateChannelRequest<CreateChannelOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const channelPayload = {
    channelName: req.body.channelName,
  };

  try {
    const channel = await createChannelOperation(channelPayload);

    res.json(formatResponse({ success: true, data: channel }));
  } catch (error) {
    next(error);
  }
};
