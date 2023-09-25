import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { getUserMessagesOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  getUserMessagesOperation: mockFunction,
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

describe('getUserMessages', () => {
  it('should return a 200 response code and user messages', async () => {
    const response = await request(app).get('/api/messages/mockUserId').set('Authorization', 'Bearer mockToken');

    expect(getUserMessagesOperation).toHaveBeenCalledWith(
      { userId: 'mockUserId' },
      { prismaClient: 'mockPrismaClient' },
    );

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
