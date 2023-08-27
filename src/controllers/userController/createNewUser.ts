import { Request, Response, NextFunction } from 'express';
import { CreateNewUserOperationTypes, createNewUserOperation } from './operations/createNewUserOperation';

interface CreateNewUserRequest<T> extends Request {
  body: T;
}

export const createNewUser = async (
  req: CreateNewUserRequest<CreateNewUserOperationTypes>,
  res: Response,
  next: NextFunction,
) => {
  const { userName, userEmail, firstName, lastName } = req.body;
  try {
    const payload = {
      userName,
      userEmail,
      firstName,
      lastName,
    };

    const newUser = await createNewUserOperation(payload);

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};
