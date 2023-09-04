import { Request, Response } from 'express';
import { formatResponse } from '../../utils';

export const checkStatus = (req: Request, res: Response) => {
  res.json(formatResponse({ success: true, data: req.baseUrl, message: 'Server is running ok!' }));
};
