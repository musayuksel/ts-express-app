import * as Joi from 'joi';

export const userSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(null),
});
