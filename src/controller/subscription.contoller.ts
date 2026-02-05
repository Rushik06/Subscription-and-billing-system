import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authenticate.js';
import {
  createUserSubscription,
  fetchSubscription,
  cancelUserSubscription
} from '../services/subscription.service.js';

function createSubscription(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { planId } = req.body as { planId?: string };

  if (!planId) {
    return res.status(400).json({ message: 'planId is required' });
  }

  const subscriptionId = createUserSubscription(
    req.user.sub,
    planId
  );

  return res.status(201).json({ subscriptionId });
}

function getSubscription(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params as { id?: string };

  if (!id) {
    return res.status(400).json({ message: 'Subscription id is required' });
  }

  const subscription = fetchSubscription(id, req.user.sub);

  if (!subscription) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return res.json(subscription);
}

function cancelSubscription(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params as { id?: string };

  if (!id) {
    return res.status(400).json({ message: 'Subscription id is required' });
  }

  cancelUserSubscription(id, req.user.sub);

  return res.json({ message: 'Subscription cancelled' });
}

export {
  createSubscription,
  getSubscription,
  cancelSubscription
};