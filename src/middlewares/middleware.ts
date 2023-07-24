import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

interface ErrorResponse {
  status: string;
  message: string;
}
// TODO : Move customError and ErrorResponse to a separate file

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Something went wrong on our side";
  err.statusCode = err.statusCode || 500;

  const errorResponse: ErrorResponse = {
    status: err.statusCode < 500 ? "fail" : "error",
    message: err.message,
  };

  res.status(err.statusCode).json(errorResponse);
};

// TODO : Move globalErrorHandler into controllers folder
