import { Request, Response } from "express";

export const checkStatus = (req: Request, res: Response) => {
  res.json({
    status: "ok",
    url: req.baseUrl,
    message: "Server is running",
  });
};
