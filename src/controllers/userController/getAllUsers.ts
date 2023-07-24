import { Request, Response } from 'express';
import { User } from '../../models/user';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    throw new CustomError('Something went wrong', 500);
  }
};
