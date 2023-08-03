import * as Joi from 'joi';

export const messageSchema = Joi.object({
  content: Joi.string().required(),
  UserId: Joi.number().required(),
  ChannelId: Joi.number().required(),
  attachment: Joi.string().allow(null),
});

export const userIdParamSchema = Joi.object({
  userId: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'userId must be a number',
  }),
});

export const messageIdParamSchema = Joi.object({
  messageId: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'messageId must be a number',
  }),
});

export const channelIdParamSchema = Joi.object({
  channelId: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'channelId must be a number',
  }),
});

export const updateMessageSchema = Joi.object({
  id: Joi.number().required(),
  content: Joi.string().required(),
  attachment: Joi.string().allow(null),
});
