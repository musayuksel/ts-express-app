import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';
import { CustomError } from './globalErrorHandler';

type Schema = ObjectSchema<any>;

export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: ValidationResult = schema.validate(req.body);

    if (error) {
      return next(new CustomError(`ValidationError: ${error.message}`, 403));
    }

    next();
  };
};
