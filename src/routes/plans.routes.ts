import { Router } from 'express';
import * as planController from '../controller/plans.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';


const planRouter = Router();

/**
 * @swagger
 * /api/plans:
 *   post:
 *     summary: Create a new subscription plan (Admin only)
 *     tags:
 *       - Plans
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Plan
 *               price:
 *                 type: number
 *                 example: 499
 *     responses:
 *       201:
 *         description: Plan created successfully
 *       403:
 *         description: Forbidden (Admin only)
 */
planRouter.post('/', authenticate, authorizeRole('ADMIN'), planController.createPlan);
/**
 * @swagger
 * /api/plans:
 *   get:
 *     summary: Get all subscription plans
 *     tags:
 *       - Plans
 *     responses:
 *       200:
 *         description: List of subscription plans
 */
planRouter.get('/', authenticate, planController.getPlans);

export default planRouter;