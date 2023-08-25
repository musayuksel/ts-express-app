import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '../../lib/prisma/prisma';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await prismaClient.users.findMany();

    res.json(allUsers);
  } catch (error) {
    next(error);
  } finally {
    await prismaClient.$disconnect();
  }
};
