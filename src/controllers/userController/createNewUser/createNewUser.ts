import { Request, Response, NextFunction } from 'express';
import { CreateNewUserOperationTypes, createNewUserOperation } from '../operations';
import { formatResponse } from '../../../utils';

interface CreateNewUserRequest<T> extends Request {
  body: T;
}

export const createNewUser = async (
  req: CreateNewUserRequest<CreateNewUserOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { userName, userEmail, firstName, lastName } = req.body;

  const payload = {
    userName,
    userEmail,
    firstName,
    lastName,
  };

  try {
    const newUser = await createNewUserOperation(payload);

    res.json(formatResponse({ success: true, data: newUser }));
  } catch (error) {
    next(error);
  }
};
