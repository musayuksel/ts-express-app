import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { addUserToChannelOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  addUserToChannelOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('addUserToChannel', () => {
  it('should return a 200 response code and the current channel', async () => {
    const response = await request(app).post('/api/channels/addUser').set('Authorization', 'Bearer mockToken').send({
      userId: 'mock user id',
      channelId: 'mock channel id',
    });

    expect(addUserToChannelOperation).toHaveBeenCalledWith({
      userId: 'mock user id',
      channelId: 'mock channel id',
    });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
