import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { GetUserMessagesOperationTypes, getUserMessagesOperation } from './operations';

interface GetUserMessagesRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const getUserMessages = async (
  req: GetUserMessagesRequest<GetUserMessagesOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const userIdPayload = {
    userId: req.params.userId,
  };

  try {
    const userMessages = await getUserMessagesOperation(userIdPayload);

    res.json({ userMessages });
  } catch (error) {
    next(error);
  }
};
