import * as Joi from 'joi';

export const channelSchema = Joi.object({
  channelName: Joi.string().required(),
});