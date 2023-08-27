import { Request, Response, NextFunction } from 'express';
import { UpdateUserOperationTypes, updateUserOperation } from './operations';

interface UpdateUserRequest<T> extends Request {
  body: T;
}

export const updateUser = async (
  req: UpdateUserRequest<UpdateUserOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { id, userName, firstName, lastName } = req.body;
  try {
    const userPayload = {
      id: id,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    };

    const updatedUser = await updateUserOperation(userPayload);
    res.json({ updatedUser });
  } catch (error) {
    next(error);
  }
};
