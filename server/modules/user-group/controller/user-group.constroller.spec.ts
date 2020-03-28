import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';
import { DBConnect } from '../../../database';
import { createDbConnect } from '../../../database';
import config from '../../../configs/config';

describe('UserGroupController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let dbConnect: DBConnect;
	let mockUserGroupService: any;
	let mockDBConnect: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
			dbConnect = await createDbConnect(config);
		});

		mockUserGroupService = {
			save: jest.fn().mockResolvedValue(true)
		};
		mockDBConnect = {
			transaction: jest.fn().mockResolvedValue(() => {
				commit: jest.fn().mockResolvedValue(dbConnect.transaction);
				rollback: jest.fn().mockResolvedValue(dbConnect.transaction);
			})
		};

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.DbConnect).toConstantValue(mockDBConnect);
		container.bind(TYPES.UserGroupService).toConstantValue(mockUserGroupService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);
	});

	xit('should create depends user-groups for method createUserGroup', async () => {
		await supertest(server.build())
			.put('/user-group')
			.send({
				userId: '9bc71fed-f320-437d-9e45-7517a6392751',
				groupId: '0983c24b-782c-4d7e-a170-6a1dbb4b7cf4'
			})
			.expect(200);
	});
});
