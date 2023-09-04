import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { getAllUsersOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  getAllUsersOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('getAllUsers', () => {
  it('should return a 200 response code and all users', async () => {
    const response = await request(app).get('/api/users').set('Authorization', 'Bearer mockToken');

    expect(getAllUsersOperation).toHaveBeenCalledWith();

    expect(response.statusCode).toBe(200);

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
