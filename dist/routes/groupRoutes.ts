import { Router } from 'express';
import * as groupController from '../controllers/groupController';

const router = Router();

router.route('/')
  .get(groupController.getAllGroups)
  .put(groupController.createGroup);

router.route('/:id')
  .get(groupController.getGroup)
  .post(groupController.updateGroup)
  .delete(groupController.deleteGroup);

export default router;