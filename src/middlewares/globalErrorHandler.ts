import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../utils';
import { Prisma } from '@prisma/client';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string = 'Something went wrong on our side', statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    err.message = `Prisma error - ${err.code} : ${err.message}`;
    err.statusCode = 500;
  }

  res.status(err.statusCode).json(formatResponse({ success: false, message: err.message }));
};
