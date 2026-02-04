import db from '../database/db.js';

 const createSubscription = (
  id: string,
  userId: string,
  planId: string
) =>
  db.prepare(
    `INSERT INTO subscriptions
     VALUES (?, ?, ?, "ACTIVE", ?, NULL, NULL, CURRENT_TIMESTAMP)`
  ).run(id, userId, planId, new Date().toISOString());

const getSubscription = (id: string, userId: string) =>
  db.prepare(
    'SELECT * FROM subscriptions WHERE id=? AND user_id=?'
  ).get(id, userId);

 const cancelSubscription = (id: string, userId: string) =>
  db.prepare(
    `UPDATE subscriptions
     SET status="CANCELLED",
         cancelled_at=CURRENT_TIMESTAMP,
         end_date=CURRENT_TIMESTAMP
     WHERE id=? AND user_id=?`
  ).run(id, userId);

  export{createSubscription,getSubscription,cancelSubscription};