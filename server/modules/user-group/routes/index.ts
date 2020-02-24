import { Router } from 'express';
import * as userGroupController from '../controller';

const router = Router();

router.route('/').put(userGroupController.createUserGroup);

export default router;
