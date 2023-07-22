import { Request, Response } from "express";
import { User } from "../models/user";

export const createNewUser = async (req: Request, res: Response) => {
  //   CREATE NEW USER
  //   const user1 = await User.create({
  //     userName: "user1",
  //     userEmail: "m.y.cc",
  //     firstName: "M",
  //     lastName: "Y",
  //   });
  const { userName, userEmail, firstName, lastName } = req.body;
  const user1 = await User.create({
    userName,
    userEmail,
    firstName,
    lastName,
  });

  res.json(user1);
};
