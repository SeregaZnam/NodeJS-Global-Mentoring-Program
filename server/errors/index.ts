import HttpStatus from 'http-status-codes';
import { ERROR_CODES } from '../constants/errors';

type ErrorData = { [key: string]: any };

export class CustomError extends Error {
   constructor(
     public message: string,
     public code: string | number = 'INTERNAL_ERROR',
     public status: number = 500,
     public data: ErrorData = {}
   ) {
      super();
   }
}

export class NotFoundError extends CustomError {
   constructor(message: string) {
      super(message, ERROR_CODES.NOT_FOUND, HttpStatus.NOT_FOUND);
   }
}

export class CreateError extends CustomError {
   constructor(message: string) {
      super(message, ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
   }
}

export class UpdateError extends CustomError {
   constructor(message: string) {
      super(message, ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
   }
}

export class DeleteError extends CustomError {
   constructor(message: string) {
      super(message, ERROR_CODES.NOT_FOUND, HttpStatus.NOT_FOUND);
   }
}
