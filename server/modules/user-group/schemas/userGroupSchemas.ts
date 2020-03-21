import * as Joi from '@hapi/joi';

export const UserGroupSchema = Joi.object({
	userId: Joi.string().required(),
	groupId: Joi.string().required()
});
