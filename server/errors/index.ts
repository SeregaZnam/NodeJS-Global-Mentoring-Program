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

export class ValidationError extends CustomError {
	constructor(error: Error, body: any) {
		super(error.message, ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST, body);
	}
}

export class InvalidTokenError extends CustomError {
	constructor(token: string) {
		super(`Invalid token ${token}`, ERROR_CODES.INVALID_TOKEN, HttpStatus.BAD_REQUEST);
	}
}

export class GetTokenError extends CustomError {
	constructor(error: Error) {
		super(error.message, ERROR_CODES.GET_TOKEN, HttpStatus.BAD_REQUEST);
	}
}
