import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';
import bodyParser from 'body-parser';

describe('GroupController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let mockGroupService: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
		});

		mockGroupService = {
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

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.GroupService).toConstantValue(mockGroupService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);
	});

	it('should return groups for method getAllGroups', async () => {
		await supertest(server.build())
			.get('/group')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('should create group for method createGroup', async () => {
		server.setConfig((app) => app.use(bodyParser.json()));
		const body = {
			name: 'Group1',
			permissions: ['READ']
		};
		await supertest(server.build())
			.put('/group')
			.send(body)
			.expect('Content-Type', /json/)
			.expect(200, {
				id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
				name: 'Group1',
				permissions: ['READ']
			});
	});

	it('should return group for method getGroup', async () => {
		await supertest(server.build())
			.get('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4')
			.expect('Content-Type', /json/)
			.expect(200, {
				id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
				name: 'Group1',
				permissions: ['READ']
			});
	});

	it('should update group for method updateGroup', async () => {
		server.setConfig((app) => app.use(bodyParser.json()));
		const body = {
			name: 'Group1',
			permissions: ['READ', 'WRITE']
		};
		await supertest(server.build())
			.post('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4')
			.send(body)
			.expect('Content-Type', /json/)
			.expect(200, {
				id: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4',
				name: 'Group1',
				permissions: ['READ', 'WRITE']
			});
	});

	it('should delete group for method deleteGroup', async () => {
		await supertest(server.build())
			.delete('/group/0983c24b-782c-4d7e-a170-6a1dbb4b7cf4')
			.expect(200);
	});
});
