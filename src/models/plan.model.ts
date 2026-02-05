import db from '../database/db.js';

 const createPlan = (
  id: string,
  name: string,
  price: number,
  cycle: string
) =>
  db.prepare(
    'INSERT INTO plans VALUES (?, ?, ?, ?, 0, NULL, CURRENT_TIMESTAMP)'
  ).run(id, name, price, cycle);

 const getPlans = () =>
  db.prepare('SELECT * FROM plans WHERE is_deleted=0').all();

 export {createPlan,getPlans};