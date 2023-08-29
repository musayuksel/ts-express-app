import * as Joi from 'joi';

export const userSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(null),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(null),
});
