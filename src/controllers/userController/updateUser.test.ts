import { mockCognitoJwtVerifier, mockFunction } from '../utils';
import { updateUserOperation } from './operations';
import { formatResponse } from '../../utils';
import request from 'supertest';
import { app } from '../../app';

jest.mock('./operations', () => ({
  updateUserOperation: mockFunction,
}));

jest.mock('../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('updateUser', () => {
  const mockUpdateUser = {
    id: 'mockUserId',
    userName: 'mockUserName',
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
  };
  it('should return a 200 response code and updated user', async () => {
    const response = await request(app)
      .patch('/api/users')
      .set('Authorization', 'Bearer mockToken')
      .send(mockUpdateUser);

    expect(updateUserOperation).toHaveBeenCalledWith(mockUpdateUser);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
