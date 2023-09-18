import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
  prismaClient: PrismaClient;
};

export type MockContext = {
  prismaClient: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => ({
  prismaClient: mockDeep<PrismaClient>(),
});
