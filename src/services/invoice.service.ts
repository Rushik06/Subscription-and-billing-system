import { v4 as uuid } from 'uuid';
import {
  createInvoice,
  getInvoiceForUser
} from '../models/invoice.model.js';

function generateInvoice(subscriptionId: string, amount: number) {
  createInvoice(uuid(), subscriptionId, amount);
}

function getInvoice(invoiceId: string, userId: string) {
  return getInvoiceForUser(invoiceId, userId);
}

export { generateInvoice, getInvoice };