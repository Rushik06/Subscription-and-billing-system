import type { Request, Response } from 'express';
import { addPlan, listPlans } from '../services/plan.service.js';

function createPlan(req: Request, res: Response) {
  const { name, price, billing_cycle } = req.body;
  addPlan(name, price, billing_cycle);
  res.status(201).json({ message: 'Plan created' });
}

function getPlans(_req: Request, res: Response) {
  const plans = listPlans();
  res.json(plans);
}

export {
  createPlan,
  getPlans
};