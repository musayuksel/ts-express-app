import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import request from 'supertest';
import { app } from '../../../app';
import { getAllChannelsOperation } from '../operations';
import { formatResponse } from '../../../utils';

jest.mock('../operations', () => ({
  getAllChannelsOperation: mockFunction,
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

describe('getAllChannels', () => {
  it('should return a 200 response code and all channels', async () => {
    const response = await request(app).get('/api/channels').set('Authorization', 'Bearer mockToken');

    expect(getAllChannelsOperation).toHaveBeenCalledWith({ prismaClient: 'mockPrismaClient' });

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
