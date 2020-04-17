import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';
import bodyParser from 'body-parser';
import { Application } from 'express';
import { InvalidTokenError } from '../../../errors';
import { initializeStrategies } from '../../../auth';

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

const mockGroupService = {
	getAll: jest.fn().mockResolvedValue([
		{
			id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
			name: 'Group1',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]),
	save: jest.fn().mockResolvedValue({
		id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
		name: 'Group1',
		permissions: ['READ'],
		createdAt: new Date(),
		updatedAt: new Date()
	}),
	getById: jest.fn().mockResolvedValue({
		id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
		name: 'Group1',
		permissions: ['READ']
	}),
	update: jest.fn().mockResolvedValue({
		id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
		name: 'Group1',
		permissions: ['READ', 'WRITE']
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

describe('GroupController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let request: Application;
	let AuthService: any;
	let GroupService: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
		});

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.AuthService).toConstantValue(mockAuthService);
		container.bind(TYPES.GroupService).toConstantValue(mockGroupService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);

		server.setConfig((app) => {
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: true }));
		});

		AuthService = container.get<typeof mockAuthService>(TYPES.AuthService);
		GroupService = container.get<typeof mockGroupService>(TYPES.GroupService);
		await initializeStrategies(GroupService, AuthService);

		request = await createAuthorizedRequest(server.build());
	});

	describe('getAllGroups', () => {
		it('should return groups for method getAllGroups', async () => {
			await request
				.get('/group')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('createGroup', () => {
		it('should create group for method createGroup', async () => {
			const body = {
				name: 'Group1',
				permissions: ['READ']
			};
			await (request as any)
				.put('/group')
				.send(body)
				.expect('Content-Type', /json/)
				.expect(200, {
					id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
					name: 'Group1',
					permissions: ['READ']
				});
		});
	});

	describe('getGroup', () => {
		it('should return group for method getGroup', async () => {
			await request
				.get('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4')
				.expect('Content-Type', /json/)
				.expect(200, {
					id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
					name: 'Group1',
					permissions: ['READ']
				});
		});
	});

	describe('updateGroup', () => {
		it('should update group for method updateGroup', async () => {
			const body = {
				name: 'Group1',
				permissions: ['READ', 'WRITE']
			};
			await (request as any)
				.post('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4')
				.send(body)
				.expect('Content-Type', /json/)
				.expect(200, {
					id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
					name: 'Group1',
					permissions: ['READ', 'WRITE']
				});
		});
	});

	describe('deleteGroup', () => {
		it('should delete group for method deleteGroup', async () => {
			await (request as any).delete('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4').expect(200);
		});
	});
});
