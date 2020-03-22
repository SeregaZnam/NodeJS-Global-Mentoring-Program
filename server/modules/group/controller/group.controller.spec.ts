import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';

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
			save: jest.fn().mockResolvedValue({}),
			getById: jest.fn().mockResolvedValue({}),
			update: jest.fn().mockResolvedValue({}),
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

	it('should create group for method createGroup', async () => {});

	it('should return group for method getGroup', async () => {});

	it('should update group for method updateGroup', async () => {});

	it('should delete group for method deleteGroup', async () => {});
});
