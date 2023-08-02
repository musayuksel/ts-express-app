import { Request, Response, NextFunction } from 'express';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'uploadFile' });
  } catch (error) {
    next(error);
  }
};
