import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
