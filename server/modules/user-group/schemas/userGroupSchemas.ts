import * as Joi from '@hapi/joi';

export const UserGroupschema = Joi.object({
   userId: Joi.string()
      .required(),
   groupId: Joi.string()
      .required()
});
