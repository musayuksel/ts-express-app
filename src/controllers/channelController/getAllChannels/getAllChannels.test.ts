import { Request, Response, NextFunction } from 'express';
import { Channel } from '../../../models/channel';
import { getAllChannels } from './getAllChannels';

jest.mock('../../../models/channel', () => ({
  Channel: {
    findAll: jest.fn(),
  },
}));

const req = {} as Request;
const res = {
  json: jest.fn(),
} as unknown as Response;
const next = jest.fn() as NextFunction;

const mockChannels = [
  {
    id: 1,
    channelName: 'channel 1',
    createdAt: '2023-08-14T20:17:39.681Z',
    updatedAt: '2023-08-14T20:17:39.681Z',
  },
  {
    id: 2,
    channelName: 'channel 2',
    createdAt: '2023-08-14T20:17:39.681Z',
    updatedAt: '2023-08-14T20:17:39.681Z',
  },
];

describe('getAllChannels', () => {
  it('should retrieve all channels and send them', async () => {
    (Channel.findAll as jest.Mock).mockResolvedValue(mockChannels);

    await getAllChannels(req, res, next);

    expect(Channel.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockChannels);
    expect(next).not.toHaveBeenCalled();
  });
});
