import passport from 'passport';
import { UserService } from '../service';
import { Request } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../utils/mappers/UserMapper';
import {
	httpGet,
	httpPut,
	httpPost,
	request,
	httpDelete,
	controller,
	BaseHttpController,
	requestParam,
	requestBody
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { NotFoundError, CreateError, UpdateError, DeleteError } from '../../../errors';
import { executionTime } from '../../../utils/executionTime';
import { Logger } from '../../../logger';
import { validateBody } from '../../../utils/validate';
import { UserSchema } from '../schemas/userSchemas';
import { AuthService } from '../../../service/auth';

@controller('/user')
export class UserController extends BaseHttpController {
	constructor(
		@inject(TYPES.Logger) private logger: Logger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.AuthService) private authService: AuthService
	) {
		super();
	}

	@httpPost('/login', passport.authenticate('auth', { session: false }))
	async signInUser(@requestBody() body: any) {
		const token = await this.authService.signToken(body);
		return this.json(token);
	}

	@httpGet('', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async getAutoSuggestUsers(
		@requestParam('loginSubstring') loginSubstring: string,
		@requestParam('limit') limit: number
	) {
		try {
			const users = await this.userService.getAutoSuggest(loginSubstring, limit);
			return this.json((users || []).map((u) => UserMapper.toDTO(u)));
		} catch (err) {
			this.logger.error('Error get users with suggest', {
				err,
				method: 'getAutoSuggestUsers',
				params: { loginSubstring, limit }
			});
			throw new NotFoundError('Error getting users');
		}
	}

	@httpPut('', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async createUser(@requestBody() body: any) {
		try {
			const { login, password, age } = await validateBody(UserSchema, body);
			const user: Omit<User, 'id'> = { login, password, age };
			const createdUser = await this.userService.save(user);
			return this.json(UserMapper.toDTO(createdUser));
		} catch (err) {
			this.logger.error('Error create request', {
				method: 'createUser',
				params: {
					login: body.login,
					password: body.password,
					age: body.age
				}
			});
			throw new CreateError('Error create user');
		}
	}

	@httpGet('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async getUser(@requestParam('id') id: string) {
		try {
			const user = await this.userService.getById(id);
			if (user) {
				return this.json(UserMapper.toDTO(user));
			}
		} catch {
			this.logger.error('Error getting user', {
				method: 'getUser',
				params: { id }
			});
			throw new NotFoundError('Error getting user');
		}
	}

	@httpPost('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async updateUser(@requestBody() body: any, @requestParam('id') id: string) {
		const user = await this.userService.getById(id);
		if (!user) {
			throw new NotFoundError('Error getting user');
		}

		try {
			const { login, password, age } = await validateBody(UserSchema, body);
			const updatedUser = await this.userService.update({ ...user, login, password, age });
			return this.json(UserMapper.toDTO(updatedUser));
		} catch {
			this.logger.error('Error updating user', {
				method: 'updateUser',
				params: { id }
			});
			throw new UpdateError('Error update user');
		}
	}

	@httpDelete('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async deleteUser(@requestParam('id') id: string) {
		try {
			const user = await this.userService.getById(id);
			if (user) {
				await this.userService.delete(user.id);
				return this.json(true);
			}
		} catch {
			this.logger.error('Error deleting user', {
				method: 'deleteUser',
				params: { id }
			});
			throw new DeleteError('Error deleting user');
		}
	}
}
