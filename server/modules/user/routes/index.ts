import { Router } from 'express';
import * as userController from '../controller';

const router = Router();

router.route('/')
   .get(userController.getAutoSuggestUsers)
   .put(userController.createUser);

router.route('/:id')
   .get(userController.getUser)
   .post(userController.updateUser)
   .delete(userController.deleteUser);

export default router;
