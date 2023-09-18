import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { deleteMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  deleteMessageOperation: mockFunction,
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

describe('deleteMessage', () => {
  it('should return a 200 response code and deleted message', async () => {
    const response = await request(app).delete('/api/messages/mockMessageId').set('Authorization', 'Bearer mockToken');

    expect(deleteMessageOperation).toHaveBeenCalledWith(
      { messageId: 'mockMessageId' },
      {
        prismaClient: 'mockPrismaClient',
      },
    );

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
