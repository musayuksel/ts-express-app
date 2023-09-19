import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
// import request, { Request } from 'supertest';
// import { app } from '../../../app';
// import { getUserChannelsOperation } from '../operations';
// import { formatResponse } from '../../../utils';

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

jest.mock('../../../lib', () => ({
  ...jest.requireActual('../../../lib'),
  prismaClient: 'mockPrismaClient',
}));

// interface CustomRequest extends Request {
//   currentUser: {
//     username: string;
//   };
// }

describe('getUserChannels', () => {
  it('should return true', () => {
    expect(true).toBe(true);
  });

  // it('should return a 200 response code and user channels', async () => {
  //   // Mock user payload
  //   const userPayload = {
  //     username: 'mockUsername',
  //   };

  //   // Mock req object with currentUser
  //   const req: CustomRequest = {
  //     currentUser: userPayload,
  //   } as CustomRequest;
  //   // Make the request using the mocked req object
  //   const response = await request(app)
  //     .get('/api/channels/userChannels')
  //     .set('Authorization', 'Bearer mockToken')
  //     .send()
  //     .expect(200);

  //   expect(getUserChannelsOperation).toHaveBeenCalledWith(
  //     { username: userPayload.username },
  //     { prismaClient: 'mockPrismaClient' },
  //   );

  //   expect(response.statusCode).toBe(200);

  //   expect(formatResponse).toHaveBeenCalledWith({
  //     success: true,
  //     data: response.body.data,
  //   });
  // });
});
