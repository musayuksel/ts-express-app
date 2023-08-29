import * as Joi from 'joi';

export const messageSchema = Joi.object({
  content: Joi.string().required(),
  userId: Joi.string().required(),
  channelId: Joi.string().required(),
  attachment: Joi.string().allow(null),
});

export const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});

export const messageIdParamSchema = Joi.object({
  messageId: Joi.string().required(),
});

export const channelIdParamSchema = Joi.object({
  channelId: Joi.string().required(),
});

export const updateMessageSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required(),
  attachment: Joi.string().allow(null),
});

export const fileNameSchema = Joi.object({
  fileName: Joi.string().required(),
});
