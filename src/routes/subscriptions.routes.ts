import { Router } from 'express';
import * as subscriptionController from '../controller/subscription.contoller.js';
import { authenticate } from '../middlewares/authenticate.js';

const subscriptionRouter = Router();
/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a subscription
 *     tags:
 *        - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscription created
 */

subscriptionRouter.post('/', authenticate, subscriptionController.createSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get subscription details
 *     tags:
 *        - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription details
 */
subscriptionRouter.get('/:id', authenticate, subscriptionController.getSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Cancel subscription
 *     tags:
 *        - Subscriptions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription cancelled
 */
subscriptionRouter.post('/:id/cancel', authenticate, subscriptionController.cancelSubscription);

export default subscriptionRouter;