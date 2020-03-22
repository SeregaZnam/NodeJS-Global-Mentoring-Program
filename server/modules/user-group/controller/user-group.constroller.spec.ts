import 'reflect-metadata';
import logger from '../../../logger';
import supertest from 'supertest';
import { TYPES } from '../../../constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, AsyncContainerModule, interfaces } from 'inversify';

describe('UserGroupController', () => {
	let container: Container;
	let server: InversifyExpressServer;
	let mockUserGroupService: any;

	beforeEach(async () => {
		container = new Container();
		const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
			await import('./index');
		});

		mockUserGroupService = {
			save: jest.fn().mockResolvedValue({})
		};

		container.bind(TYPES.Logger).toConstantValue(logger);
		container.bind(TYPES.UserGroupService).to(mockUserGroupService);

		server = new InversifyExpressServer(container);
		await container.loadAsync(bindings);
	});

	it('should create depends user-groups for method createUserGroup', async () => {});
});
