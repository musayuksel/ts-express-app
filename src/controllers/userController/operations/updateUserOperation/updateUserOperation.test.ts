import { Context, MockContext, createMockContext, mockUser } from '../../../../lib';
import { updateUserOperation } from './updateUserOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('updateUserOperation', () => {
  it('should update a user', async () => {
    const mockUserPayload = {
      id: 'uuid_random_user_id',
      userName: 'testUserName',
      firstName: 'updated testFirstName',
    };
    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUser);
    mockContext.prismaClient.users.update.mockResolvedValue({ ...mockUser, firstName: 'updated testFirstName' });

    const updatedUser = await updateUserOperation(mockUserPayload, context);

    expect(updatedUser.firstName).toBe(mockUserPayload.firstName);
  });

  it('should throw an error if user does not exist', async () => {
    mockContext.prismaClient.users.findUnique.mockResolvedValue(null);

    await expect(() => updateUserOperation(mockUser, context)).rejects.toThrow('User not found');
  });
});
