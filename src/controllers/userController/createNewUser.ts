import { Request, Response } from 'express';
import { User } from '../../models/user';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const createNewUser = async (req: Request, res: Response) => {
  const { userName, userEmail, firstName, lastName } = req.body;
  try {
    const foundUser = await User.findOne({
      where: {
        userEmail,
      },
    });

    if (foundUser) {
      throw new CustomError('User already exists', 400);
    }

    const user = await User.create({
      userName,
      userEmail,
      firstName,
      lastName,
    });

    res.json(user);
  } catch (error) {
    throw new CustomError(`unable to create user ${userEmail}`, 500);
  }
};
