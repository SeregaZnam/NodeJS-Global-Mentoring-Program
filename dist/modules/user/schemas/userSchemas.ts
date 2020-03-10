import * as Joi from '@hapi/joi';

export const UserSchema = Joi.object({
   login: Joi.string()
      .required(),
   password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
      .required(),
   age: Joi.number()
      .min(4)
      .max(130)
      .required()
});
