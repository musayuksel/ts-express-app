import { Request, Response, NextFunction } from 'express';
import { GetChannelMessagesOperationTypes, getChannelMessagesOperation } from './operations';
import { ParamsDictionary } from 'express-serve-static-core';

interface GetChannelMessagesRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const getChannelMessages = async (
  req: GetChannelMessagesRequest<GetChannelMessagesOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = {
      channelId: req.params.channelId,
    };

    const channelMessages = await getChannelMessagesOperation(payload);

    res.json(channelMessages);
  } catch (error) {
    next(error);
  }
};
