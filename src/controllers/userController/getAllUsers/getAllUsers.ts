import { Request, Response, NextFunction } from 'express';
import { getAllUsersOperation } from '../operations';
import { formatResponse } from '../../../utils';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await getAllUsersOperation();

    res.json(formatResponse({ success: true, data: allUsers }));
  } catch (error) {
    next(error);
  }
};
