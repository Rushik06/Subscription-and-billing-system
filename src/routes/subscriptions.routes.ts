import { Router } from 'express';
import * as subscriptionController from '../controller/subscription.contoller.js';
import { authenticate } from '../middlewares/authenticate.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authenticate, subscriptionController.createSubscription);
subscriptionRouter.get('/:id', authenticate, subscriptionController.getSubscription);
subscriptionRouter.post('/:id/cancel', authenticate, subscriptionController.cancelSubscription);

export default subscriptionRouter;