import express from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import planRouter from './routes/plans.routes.js';
import invoiceRouter from './routes/invoices.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import { env } from './config/env.js';

const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());
app.use('/auth',authRouter);
app.use('/users',userRouter);
app.use('/api/plans',planRouter);
app.use('/api/invoices',invoiceRouter);
app.use('/api/subscriptions',subscriptionRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});