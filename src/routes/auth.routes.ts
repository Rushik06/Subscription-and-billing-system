import { Router } from 'express';
import * as authController from '../controller/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/logout', authenticate, authController.logout);

export default authRouter;