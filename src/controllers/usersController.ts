import { Request, Response } from "express";
import { User } from "../models/user";

export const createNewUser = async (req: Request, res: Response) => {
  const { userName, userEmail, firstName, lastName } = req.body;
  const user1 = await User.create({
    userName,
    userEmail,
    firstName,
    lastName,
  });

  res.json(user1);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
