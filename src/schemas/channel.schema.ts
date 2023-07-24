import * as Joi from 'joi';

export const channelSchema = Joi.object({
  channelName: Joi.string().required(),
});

export const messageSchema = Joi.object({
  content: Joi.string().required(),
  UserId: Joi.number().required(),
  ChannelId: Joi.number().required(),
  attachment: Joi.string().allow(null),
});
