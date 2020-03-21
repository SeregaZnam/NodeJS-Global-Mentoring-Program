import * as Joi from '@hapi/joi';
import { ValidationError } from '../errors';

export const validateBody = async (schema: Joi.ObjectSchema, body: any, options = {}) => {
	try {
		return await schema.validateAsync(body, options);
	} catch (error) {
		throw new ValidationError(error, body);
	}
};
