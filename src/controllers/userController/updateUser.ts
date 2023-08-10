import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../middlewares/globalErrorHandler';
import { User } from '../../models/user';

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id, userName, firstName, lastName } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user === null) {
      throw new CustomError(`User with id ${id} not found`, 404);
    }

    await User.update(
      {
        userName,
        firstName,
        lastName,
      },
      {
        where: {
          id: id,
        },
      },
    );

    const updatedUser = await User.findByPk(id);
    res.json({ 'updatedUser:': updatedUser });
  } catch (error) {
    next(error);
  }
};
