import { Request, Response, NextFunction } from 'express';
import { UpdateUserOperationTypes, updateUserOperation } from './operations';
import { formatResponse } from '../../utils';

interface UpdateUserRequest<T> extends Request {
  body: T;
}

export const updateUser = async (
  req: UpdateUserRequest<UpdateUserOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { id, userName, firstName, lastName } = req.body;

  const userPayload = {
    id: id,
    userName: userName,
    firstName: firstName,
    lastName: lastName,
  };

  try {
    const updatedUser = await updateUserOperation(userPayload);

    res.json(formatResponse({ success: true, data: updatedUser }));
  } catch (error) {
    next(error);
  }
};
