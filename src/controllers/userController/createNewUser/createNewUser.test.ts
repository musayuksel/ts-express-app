import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { createNewUserOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  createNewUserOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

jest.mock('../../../lib', () => ({
  ...jest.requireActual('../../../lib'),
  prismaClient: 'mockPrismaClient',
}));

describe('createNewUser', () => {
  const mockUser = {
    userName: 'mockUserName',
    userEmail: 'mockUserEmail@email.cc',
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
  };

  it('should return a 200 response code and new user data', async () => {
    const response = await request(app).post('/api/users').set('Authorization', 'Bearer mockToken').send(mockUser);

    expect(createNewUserOperation).toHaveBeenCalledWith(mockUser, { prismaClient: 'mockPrismaClient' });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
