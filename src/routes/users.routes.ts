import { Router } from 'express';
import * as userController from '../controller/users.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 */
userRouter.get('/me', authenticate, userController.getMe);
/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 */
userRouter.put('/me', authenticate, userController.updateMe);
/**
 * @swagger
 * /users/me/password:
 *   patch:
 *     summary: Update current user password
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
userRouter.patch('/me/password', authenticate, userController.updatePassword);
/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete current user account
 *     tags:
 *        - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 */
userRouter.delete('/me', authenticate, userController.deleteMe);

export default userRouter;