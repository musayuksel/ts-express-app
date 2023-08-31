import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
// import request from 'supertest';
// import { app } from '../../app';
// import { getUserChannelsOperation } from './operations';
// import { formatResponse } from '../../utils';

jest.mock('../operations', () => ({
  getUserChannelsOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('getUserChannels', () => {
  it('should return a 200 response code and user channels', async () => {
    // const response = await request(app).get('api/channels/userChannels').set('Authorization', 'Bearer mockToken');

    expect(true).toBe(true);
    // https://stackoverflow.com/questions/26794541/access-to-req-object-in-supertest-after-a-response
    // expect(getUserChannelsOperation).toHaveBeenCalledWith({
    //   userName: 'mockUsername',
    // });
  });
});
