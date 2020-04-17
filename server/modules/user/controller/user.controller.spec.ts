import 'reflect-metadata';
import logger from '../../../logger';
import supertest, { SuperTest, Test } from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';
import { Application } from 'express';
import { initializeStrategies } from '../../../auth';
import { InvalidTokenError } from '../../../errors';
import bodyParser from 'body-parser';

const AUTH_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmMTBhODFhLTk1NGItNGJlMi04ZmI2LWE2Zjk4Yjk5OWRlZSIsImxvZ2luIjoiVGVzMiIsInBhc3N3b3JkIjoiMTIzd2VyIn0.9MRa4vwA8dpoimSf6nnWJOUpJzsYsMp4R7tH_be7zfo';

const TEST_USER = {
	id: '9bc71fed-f320-437d-9e45-7517a6392751',
	login: 'Sergey',
	password: 'password',
	age: 25,
	createdAt: new Date(),
	updatedAt: new Date()
};

const mockUserService = {
	getAutoSuggest: jest.fn().mockResolvedValue([TEST_USER]),
	save: jest.fn().mockResolvedValue({
		id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
		login: 'Test',
		password: 'pass123wer',
		age: 10,
		createdAt: new Date(),
		updatedAt: new Date()
	}),
	getById: jest.fn().mockResolvedValue({
		id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
		login: 'Test',
		age: 20
	}),
	update: jest.fn().mockResolvedValue({
		id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
		login: 'Tes2',
		age: 10
	}),
	delete: jest.fn().mockResolvedValue({})
};

const mockAuthService = {
	signToken: jest.fn().mockResolvedValue(AUTH_TOKEN),
	// verifyToken: jest.fn().mockResolvedValue(TEST_USER)
	verifyToken: jest.fn().mockImplementation((token: string) => {
		if (token === AUTH_TOKEN) {
			return TEST_USER;
		}
		throw new InvalidTokenError(token);
	})
};

const createRequestWithToken = (request: any, token: string): Application => {
	const obj: any = {};
	for (const key in request) {
		if (Object.prototype.hasOwnProperty.call(request, key)) {
			const method = request[key];
			obj[key] = (path: any) =>
				method(path)
					.set('Authorization', token)
					.set('Accept', 'application/json');
		}
	}

	return obj as Application;
};

const createAuthorizedRequest = async (app: Application): Promise<Application> => {
	const _request = supertest(app);
	const token = `Bearer ${AUTH_TOKEN}`;

	return createRequestWithToken(_request, token);
};

describe('UserController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let request: Application;
	let AuthService: any;
	let UserService: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
		});

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.AuthService).toConstantValue(mockAuthService);
		container.bind(TYPES.UserService).toConstantValue(mockUserService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);

		server.setConfig((app) => {
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: true }));
		});

		AuthService = container.get<typeof mockAuthService>(TYPES.AuthService);
		UserService = container.get<typeof mockUserService>(TYPES.UserService);
		await initializeStrategies(UserService, AuthService);

		request = await createAuthorizedRequest(server.build());
	});

	describe('getAutoSuggestUsers', () => {
		it('should return users for method getAutoSuggestUsers', async () => {
			const getResponse = await request
				.get('/user?limit=10')
				.expect('Content-Type', /json/)
				.expect(200);

			expect(UserService.getAutoSuggest).toBeCalled();
			expect(Array.isArray(getResponse.body)).toBeTruthy();
			expect(getResponse.body[0].login).toEqual('Sergey');
		});
	});

	describe('getUser', () => {
		it('should return user by id', async () => {
			const userId = '8f10a81a-954b-4be2-8fb6-a6f98b999dee';
			const getUserResponse = await request
				.get(`/user/${userId}`)
				.expect('Content-Type', /json/)
				.expect(200);

			expect(AuthService.verifyToken).toBeCalled();
			expect(UserService.getById).toBeCalledWith(userId);
			expect(getUserResponse.body.login).toContain('Test');
		});
	});

	describe('createUser', () => {
		it('should create user for method createUser', async () => {
			const body = {
				login: 'Test',
				password: 'pass123wer',
				age: 10
			};
			await (request as any)
				.put('/user')
				.send(body)
				.expect(200, {
					id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
					login: 'Test',
					age: 10
				});
		});
	});

	describe('updateUser', () => {
		it('should update user for method updateUser', async () => {
			const body = {
				login: 'Test',
				password: 'pass123wer',
				age: 10
			};
			await (request as any)
				.post('/user/8f10a81a-954b-4be2-8fb6-a6f98b999dee')
				.send(body)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.expect(200, {
					id: '8f10a81a-954b-4be2-8fb6-a6f98b999dee',
					login: 'Tes2',
					age: 10
				});
		});
	});

	describe('deleteUser', () => {
		it('should delete user for method deleteUser', async () => {
			await (request as any).delete('/user/8f10a81a-954b-4be2-8fb6-a6f98b999dee').expect(200);
		});
	});
});
