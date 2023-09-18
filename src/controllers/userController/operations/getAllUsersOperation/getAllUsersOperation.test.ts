import { Context, MockContext, createMockContext, mockUser } from '../../../../lib';
import { getAllUsersOperation } from './getAllUsersOperation';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

describe('getAllUsersOperation', () => {
  it('should return all users', async () => {
    const mockUsers = [{ ...mockUser }, { ...mockUser }];

    mockContext.prismaClient.users.findMany.mockResolvedValue(mockUsers);

    const users = await getAllUsersOperation(context);

    expect(users).toHaveLength(2);
  });
});
