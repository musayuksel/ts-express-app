import * as Joi from 'joi';

export const channelSchema = Joi.object({
  channelName: Joi.string().required(),
});

export const addUserToChannelSchema = Joi.object({
  userId: Joi.string().required(),
  channelId: Joi.string().required(),
});
