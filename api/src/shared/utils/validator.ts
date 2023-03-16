import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';
import AppError from './appError';
/**
 * @param  {ObjectSchema} schema joi schema
 * @param  {any} data data object to validate
 * @returns void
 */
export function validateSchema(schema: ObjectSchema, data: any): void {
  const { error } = schema.validate(data, {
    errors: {
      wrap: {
        label: ''
      }
    }
  });
  if (error) throw new AppError(error.details[0].message, StatusCodes.BAD_REQUEST);
}
