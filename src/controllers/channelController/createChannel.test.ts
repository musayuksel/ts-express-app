import request from 'supertest';
import { app } from '../../index';
import { createChannelOperation } from './operations';
import { formatResponse } from '../../utils';

jest.mock('./operations', () => ({
  createChannelOperation: jest.fn(),
}));

jest.mock('../../utils', () => ({
  formatResponse: jest.fn(),
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: {
    create: () => ({
      verify: (token: string) => {
        if (token === 'mockToken') {
          return { username: 'mockUsername' };
        }
        throw new Error('mock aws error');
      },
    }),
  },
}));

describe('createChannel', () => {
  it('should return a 200 response code and a new thing', async () => {
    const { body } = await request(app).post('/api/channels').set('Authorization', 'Bearer mockToken').send({
      channelName: 'mock channel name',
    });

    expect(createChannelOperation).toHaveBeenCalledWith({
      channelName: 'mock channel name',
    });

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: body.data,
    });
  });
});
