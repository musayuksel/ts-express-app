import { Request, Response, NextFunction } from 'express';
import { getAllUsersOperation } from './operations';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await getAllUsersOperation();

    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};
