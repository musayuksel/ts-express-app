import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { updateMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  updateMessageOperation: mockFunction,
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

describe('updateMessage', () => {
  const mockUpdateMessage = {
    id: 'mockMessageId',
    content: 'mock updated content',
  };

  it('should return a 200 response code and updated message', async () => {
    const response = await request(app)
      .patch('/api/messages')
      .set('Authorization', 'Bearer mockToken')
      .send(mockUpdateMessage);

    expect(updateMessageOperation).toHaveBeenCalledWith(mockUpdateMessage, {
      prismaClient: 'mockPrismaClient',
    });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
