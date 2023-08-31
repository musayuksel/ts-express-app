import { Request, Response, NextFunction } from 'express';
import { GetChannelMessagesOperationTypes, getChannelMessagesOperation } from '../operations';
import { ParamsDictionary } from 'express-serve-static-core';
import { formatResponse } from '../../../utils';

interface GetChannelMessagesRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const getChannelMessages = async (
  req: GetChannelMessagesRequest<GetChannelMessagesOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const payload = {
    channelId: req.params.channelId,
  };

  try {
    const channelMessages = await getChannelMessagesOperation(payload);

    res.json(formatResponse({ success: true, data: channelMessages }));
  } catch (error) {
    next(error);
  }
};
