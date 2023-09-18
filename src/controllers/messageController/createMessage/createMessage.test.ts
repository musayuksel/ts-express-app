import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { createMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  createMessageOperation: mockFunction,
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

describe('createMessage', () => {
  const mockMessage = {
    content: 'mock content',
    userId: 'mock userId',
    channelId: 'mock channelId',
  };

  it('should return a 200 response code and created message', async () => {
    const response = await request(app)
      .post('/api/messages')
      .set('Authorization', 'Bearer mockToken')
      .send(mockMessage);

    expect(createMessageOperation).toHaveBeenCalledWith(mockMessage, {
      prismaClient: 'mockPrismaClient',
    });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
