import * as Joi from '@hapi/joi';
import { ValidationError } from '../errors';

export const validateBody = async (schema: Joi.ObjectSchema, body: any, options = {}) => {
   try {
      const value = await schema.validateAsync(body, options);
      return value;
   } catch (error) {
      throw new ValidationError(error, body);
   }
};
