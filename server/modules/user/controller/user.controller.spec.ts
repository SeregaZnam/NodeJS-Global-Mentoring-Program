import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';

describe('UserController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let mockUserService: any;
	let mockAuthService: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
		});

		mockUserService = {
			getAutoSuggest: jest.fn().mockResolvedValue([
				{
					id: '9bc71fed-f320-437d-9e45-7517a6392751',
					login: 'Sergey',
					password: 'password',
					age: 25,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			]),
			save: jest.fn().mockResolvedValue({
				id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
				login: 'Test',
				password: 'test',
				age: 10,
				createdAt: new Date(),
				updatedAt: new Date()
			}),
			getUser: jest.fn().mockResolvedValue({}),
			updateUser: jest.fn().mockResolvedValue({}),
			deleteUser: jest.fn().mockResolvedValue({})
		};
		mockAuthService = {
			verifyToken: jest.fn().mockResolvedValue({})
		};

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.AuthService).toConstantValue(mockAuthService);
		container.bind(TYPES.UserService).toConstantValue(mockUserService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);
	});

	it('should return users for method getAutoSuggestUsers', async () => {
		await supertest(server.build())
			.get('/user?limit=10&loginSubstring=""')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('should create user for method createUser', async () => {
		await supertest(server.build())
			.put('')
			.expect(200);
	});

	it('should return user for method getUser', async () => {});

	it('should update user for method updateUser', async () => {});

	it('should delete user for method deleteUser', async () => {});
});