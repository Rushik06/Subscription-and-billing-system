import db from '../database/db.js';

 const createInvoice = (
  id: string,
  subscriptionId: string,
  amount: number
) =>
  db.prepare(
    'INSERT INTO invoices VALUES (?, ?, ?, "PAID", CURRENT_TIMESTAMP)'
  ).run(id, subscriptionId, amount);

 const getInvoiceForUser = (invoiceId: string, userId: string) =>
  db.prepare(
    `SELECT i.*
     FROM invoices i
     JOIN subscriptions s ON s.id=i.subscription_id
     WHERE i.id=? AND s.user_id=?`
  ).get(invoiceId, userId);

  export {createInvoice,getInvoiceForUser};