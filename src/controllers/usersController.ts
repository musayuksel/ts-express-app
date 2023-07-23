import { Request, Response } from "express";
import { User } from "../models/user";
import { customError } from "../middlewares/globalErrorMiddleware";

export const createNewUser = async (req: Request, res: Response) => {
  const { userName, userEmail, firstName, lastName } = req.body;

  //   TODO: validate the input data with an efficient way
  if (!userName || !userEmail || !firstName || !lastName) {
    throw new customError("Please provide all the details", 400);
  }
  // check if user already exists
  const user = await User.findOne({
    where: {
      userEmail,
    },
  });
  if (user) {
    throw new customError("User already exists", 400);
  }

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
