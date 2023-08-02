import { Request, Response, NextFunction } from 'express';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.file);
    res.json({ file: req.file?.originalname, mimetype: req.file?.mimetype });
  } catch (error) {
    next(error);
  }
};
