import { Router } from "express";
import * as userGroupController from '../controllers/userGroupController';

const router = Router();

router.route('/').put(userGroupController.createUserGroup);

export default router;