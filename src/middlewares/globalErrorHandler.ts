import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  statusCode: number;

  constructor(
    message: string = 'Something went wrong on our side',
    statusCode: number = 500
  ) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

interface ErrorResponse {
  status: string;
  message: string;
}

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: ErrorResponse = {
    status: err.statusCode < 500 ? 'fail' : 'error',
    message: err.message,
  };

  res.status(err.statusCode ?? 500).json(errorResponse);
};
