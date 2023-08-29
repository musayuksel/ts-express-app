import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { prismaClient } from './prisma';
import 'jest';

if (typeof jest !== 'undefined') {
  jest.mock('./prisma', () => ({
    __esModule: true,
    prismaClient: mockDeep<PrismaClient>(),
  }));
  beforeEach(() => {
    mockReset(prismaMock);
  });
}

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>;
