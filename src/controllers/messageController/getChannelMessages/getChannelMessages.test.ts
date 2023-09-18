import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { getChannelMessagesOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  getChannelMessagesOperation: mockFunction,
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

describe('getChannelMessages', () => {
  it('should return a 200 response code and channel messages', async () => {
    const response = await request(app)
      .get('/api/messages/channel/mockChannelId')
      .set('Authorization', 'Bearer mockToken');

    expect(getChannelMessagesOperation).toHaveBeenCalledWith(
      { channelId: 'mockChannelId' },
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
