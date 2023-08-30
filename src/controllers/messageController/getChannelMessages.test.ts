import { mockCognitoJwtVerifier, mockFunction } from '../utils';
import { getChannelMessagesOperation } from './operations';
import { formatResponse } from '../../utils';
import request from 'supertest';
import { app } from '../../app';

jest.mock('./operations', () => ({
  getChannelMessagesOperation: mockFunction,
}));

jest.mock('../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('getChannelMessages', () => {
  it('should return a 200 response code and channel messages', async () => {
    const response = await request(app)
      .get('/api/messages/channel/mockChannelId')
      .set('Authorization', 'Bearer mockToken');

    expect(getChannelMessagesOperation).toHaveBeenCalledWith({ channelId: 'mockChannelId' });

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
