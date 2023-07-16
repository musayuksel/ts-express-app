import { Request, Response, NextFunction } from "express";

export class customError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ err });
  err.message = err.message || "Something went wrong in our side";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.statusCode < 500 ? "fail" : "error",
    message: err.message,
  });
};
