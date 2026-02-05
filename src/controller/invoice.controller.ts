import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authenticate.js';
import { getInvoice } from '../services/invoice.service.js';

function getInvoiceById(req: AuthRequest, res: Response) {
  const paramId = req.params.id;

  if (typeof paramId !== 'string') {
    return res.status(400).json({ message: 'Invoice id is required' });
  }

  const invoice = getInvoice(paramId, req.user!.sub);

  if (!invoice) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(invoice);
}

export { getInvoiceById };