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

export const userIdParamScheme = Joi.object({
  userId: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'userId must be a number',
  }),
});