import {
   request,
   httpPut,
   controller,
   BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { executionTime } from '../../../utils/executionTime';
import { DBConnect } from '../../../database';
import { UserGroupService } from '../service';
import { Request } from 'express';
import { Logger } from '../../../logger';
import { CreateError } from '../../../errors';
import { validateBody } from '../../../utils/validate';
import { UserGroupschema } from '../schemas/userGroupSchemas';

@controller('/user-group')
export class UserGroupController extends BaseHttpController {
   constructor(
      @inject(TYPES.Logger) private logger: Logger,
      @inject(TYPES.DbConnect) private dbConnect: DBConnect,
      @inject(TYPES.UserGroupService) private userGroupService: UserGroupService
   ) {
      super();
   }

   @httpPut('')
   @executionTime()
   async createUserGroup(
      @request() req: Request
   ) {
      const transaction = await this.dbConnect.transaction();

      try {
         const value = await validateBody(UserGroupschema, req.body);
         await this.userGroupService.save(value.userId, value.groupId, transaction);
         await transaction.commit();

         return this.json(true);
      } catch (err) {
         await transaction.rollback();

         this.logger.error('Error create request', {
            method: 'createUser',
            params: {
               userId: req.body.userId,
               groupId: req.body.groupId
            }
         });
         throw new CreateError('Error create user group');
      }
   }
}
