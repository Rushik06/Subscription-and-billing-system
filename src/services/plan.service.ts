import { v4 as uuid } from 'uuid';
import { createPlan, getPlans } from '../models/plan.model.js';

function addPlan(name: string, price: number, cycle: string) {
  createPlan(uuid(), name, price, cycle);
}

function listPlans() {
  return getPlans();
}

export { addPlan, listPlans };