import { Router } from 'express';
import * as planController from '../controller/plans.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';


const planRouter = Router();

planRouter.post('/', authenticate, authorizeRole('ADMIN'), planController.createPlan);
planRouter.get('/', authenticate, planController.getPlans);

export default planRouter;