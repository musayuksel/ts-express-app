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

export const userIdParamSchema = Joi.object({
  userId: Joi.string().pattern(new RegExp('^[0-9]+$')).required().messages({
    'string.pattern.base': 'userId must be a number',
  }),
});

export const userSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(null),
});
