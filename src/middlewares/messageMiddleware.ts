import { Request, Response, NextFunction } from 'express';

export const logBody = (req: Request, res: Response, next: NextFunction) => {
  console.info({ RequestBody: req.body });
  next();
};
