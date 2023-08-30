import request from 'supertest';
import { app } from '../../app';
import { getAllChannelsOperation } from './operations';
import { formatResponse } from '../../utils';

jest.mock('./operations', () => ({
  getAllChannelsOperation: jest.fn(),
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

describe('getAllChannels', () => {
  it('should return a 200 response code and all channels', async () => {
    const response = await request(app).get('/api/channels').set('Authorization', 'Bearer mockToken');

    expect(getAllChannelsOperation).toHaveBeenCalled();

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
