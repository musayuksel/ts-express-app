import { mockCognitoJwtVerifier, mockFunction } from '../../utils';
import { deleteMessageOperation } from '../operations';
import { formatResponse } from '../../../utils';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../operations', () => ({
  deleteMessageOperation: mockFunction,
}));

jest.mock('../../../utils', () => ({
  formatResponse: mockFunction,
}));

jest.mock('aws-jwt-verify', () => ({
  ...jest.requireActual('aws-jwt-verify'),
  CognitoJwtVerifier: mockCognitoJwtVerifier,
}));

describe('deleteMessage', () => {
  it('should return a 200 response code and deleted message', async () => {
    const response = await request(app).delete('/api/messages/mockMessageId').set('Authorization', 'Bearer mockToken');

    expect(deleteMessageOperation).toHaveBeenCalledWith({ messageId: 'mockMessageId' });

    expect(formatResponse).toHaveBeenCalledWith({
      success: true,
      data: response.body.data,
    });
  });
});
