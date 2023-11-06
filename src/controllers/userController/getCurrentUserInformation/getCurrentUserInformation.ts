import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../../../utils';
import { prismaClient } from '../../../lib';
import { getCurrentUserInformationOperation } from '../operations';

export const getCurrentUserInformation = async (req: Request, res: Response, next: NextFunction) => {
  const userPayload = {
    userName: req.currentUser?.username,
  };

  try {
    const allUsers = await getCurrentUserInformationOperation(userPayload, { prismaClient });

    res.json(formatResponse({ success: true, data: allUsers }));
  } catch (error) {
    next(error);
  }
};
