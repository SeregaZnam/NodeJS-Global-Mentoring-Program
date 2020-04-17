import passport from 'passport';
import { Request } from 'express';
import { GroupDTO } from '../dto/groupDTO';
import { GroupService } from '../service';
import {
	httpGet,
	request,
	httpPut,
	httpPost,
	httpDelete,
	controller,
	requestBody,
	requestParam,
	BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { executionTime } from '../../../utils/executionTime';
import { TYPES } from '../../../constants/types';
import { CreateError, NotFoundError, UpdateError, DeleteError } from '../../../errors';
import { Logger } from '../../../logger';
import { GroupSchema } from '../schemas/groupSchemas';
import { validateBody } from '../../../utils/validate';
import { GroupMapper } from '../utils/mappers/GroupMapper';
import { AuthService } from '../../../service/auth';

@controller('/group')
export class GroupController extends BaseHttpController {
	constructor(
		@inject(TYPES.Logger) private logger: Logger,
		@inject(TYPES.GroupService) private groupService: GroupService,
		@inject(TYPES.AuthService) private authService: AuthService
	) {
		super();
	}

	@httpGet('', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async getAllGroups() {
		try {
			const groups = await this.groupService.getAll();
			return this.json((groups || []).map((g) => GroupMapper.toDTO(g)));
		} catch (err) {
			this.logger.error('Error get users with suggest', {
				err,
				method: 'getAllGroups'
			});
			throw new NotFoundError('Error getting groups');
		}
	}

	@httpPut('', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async createGroup(@requestBody() body: any) {
		try {
			const { name, permissions } = await validateBody(GroupSchema, body);
			const createdGroup = await this.groupService.save({ name, permissions });

			return this.json(GroupMapper.toDTO(createdGroup));
		} catch (err) {
			this.logger.error('Error create request', {
				method: 'createGroup',
				params: {
					name: body.name,
					permissions: body.permissions
				}
			});
			throw new CreateError('Error create group');
		}
	}

	@httpGet('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async getGroup(@requestParam('id') id: string) {
		try {
			const group = await this.groupService.getById(id);
			return this.json(group && GroupMapper.toDTO(group));
		} catch {
			this.logger.error('Error getting user', {
				method: 'getGroup',
				params: { id }
			});
			throw new NotFoundError('Error getting group');
		}
	}

	@httpPost('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async updateGroup(@requestBody() body: any, @requestParam('id') id: string) {
		const group = await this.groupService.getById(id);

		if (!group) {
			throw new NotFoundError('Group not found');
		}

		try {
			const { name, permissions } = await validateBody(GroupSchema, body);
			const updatedGroup = await this.groupService.update({
				...group,
				name,
				permissions
			});
			return this.json(GroupMapper.toDTO(updatedGroup));
		} catch {
			this.logger.error('Error updating group', {
				method: 'updateGroup',
				params: { id }
			});
			throw new UpdateError('Error update group');
		}
	}

	@httpDelete('/:id', passport.authenticate('bearer', { session: false }))
	@executionTime()
	async deleteGroup(@requestParam('id') id: string) {
		try {
			const group = await this.groupService.getById(id);
			if (group) {
				await this.groupService.delete(group.id);
				return this.json(true);
			}
		} catch {
			throw new DeleteError('Error deleting group');
		}
	}
}
