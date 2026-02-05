import { Router } from 'express';
import * as invoiceController from '../controller/invoice.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const invoiceRouter = Router();

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get user invoices
 *     tags:
 *        - Invoice
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
 */
invoiceRouter.get('/:id', authenticate, invoiceController.getInvoiceById);

export default invoiceRouter;