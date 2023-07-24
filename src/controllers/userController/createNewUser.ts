import { Request, Response } from 'express';
import { User } from '../../models/user';
import { CustomError } from '../../middlewares/globalErrorHandler';

export const createNewUser = async (req: Request, res: Response) => {
  const { userName, userEmail, firstName, lastName } = req.body;
  try {
    const user = await User.findOne({
      where: {
        userEmail,
      },
    });
    if (user) {
      console.log('user already exists>--------------------');
      throw new CustomError('User already exists', 400);
    }

    const user1 = await User.create({
      userName,
      userEmail,
      firstName,
      lastName,
    });

    res.json(user1);
  } catch (error) {
    throw new CustomError(`unable to create user ${userEmail}`, 500);
  }
};
