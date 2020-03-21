import * as Joi from '@hapi/joi';

export const GroupSchema = Joi.object({
	name: Joi.string().required(),
	permissions: Joi.array()
		.items(Joi.string())
		.required()
});
