import { Context, MockContext, createMockContext, mockUser } from '../../../../lib';
import { createNewUserOperation } from './createNewUserOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('createNewUserOperation', () => {
  it('should create a new user', async () => {
    mockContext.prismaClient.users.findUnique.mockResolvedValue(null);
    mockContext.prismaClient.users.create.mockResolvedValue(mockUser);

    const createdUser = await createNewUserOperation(mockUser, context);

    expect(createdUser).toBe(mockUser);
  });

  it('should throw an error if user already exists', async () => {
    mockContext.prismaClient.users.findUnique.mockResolvedValue(mockUser);

    await expect(() => createNewUserOperation(mockUser, context)).rejects.toThrow(
      `User with name "${mockUser.userName}" already exists`,
    );
  });
});
