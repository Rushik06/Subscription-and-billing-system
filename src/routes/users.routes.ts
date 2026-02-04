import { Router } from 'express';
import * as userController from '../controller/users.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/me', authenticate, userController.getMe);
userRouter.put('/me', authenticate, userController.updateMe);
userRouter.patch('/me/password', authenticate, userController.updatePassword);
userRouter.delete('/me', authenticate, userController.deleteMe);

export default userRouter;