import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import request from 'supertest';
import { app } from '../../../app';
import { createChannelOperation } from '../operations';
import { formatResponse } from '../../../utils';

jest.mock('../operations', () => ({
  createChannelOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('createChannel', () => {
  it('should return a 200 response code and a new channel', async () => {
    const response = await request(app).post('/api/channels').set('Authorization', 'Bearer mockToken').send({
      channelName: 'mock channel name',
    });

    expect(createChannelOperation).toHaveBeenCalledWith({
      channelName: 'mock channel name',
    });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
