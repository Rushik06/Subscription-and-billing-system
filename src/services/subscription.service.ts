import { v4 as uuid } from 'uuid';
import {
  createSubscription,
  getSubscription,
  cancelSubscription
} from '../models/subscription.model.js';

function createUserSubscription(userId: string, planId: string) {
  const id = uuid();
  createSubscription(id, userId, planId);
  return id;
}

function fetchSubscription(id: string, userId: string) {
  return getSubscription(id, userId);
}

function cancelUserSubscription(id: string, userId: string) {
  cancelSubscription(id, userId);
}

export {
  createUserSubscription,
  fetchSubscription,
  cancelUserSubscription
};