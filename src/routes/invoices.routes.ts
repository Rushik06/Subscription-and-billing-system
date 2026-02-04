import { Router } from 'express';
import * as invoiceController from '../controller/invoice.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const invoiceRouter = Router();

invoiceRouter.get('/:id', authenticate, invoiceController.getInvoiceById);

export default invoiceRouter;