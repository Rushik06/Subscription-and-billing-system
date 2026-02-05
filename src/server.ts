//express framework
import express from 'express';
//routes
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import planRouter from './routes/plans.routes.js';
import invoiceRouter from './routes/invoices.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
//env
import { env } from './config/env.js';
//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';
//security middlewares
//import { applySecurityMiddlewares } from './middlewares/security.js';

const app = express();
const PORT = env.PORT || 3000;

//apply security
//applySecurityMiddlewares(app);

//middlewares
app.use(express.json());

//swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/api/plans', planRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/subscriptions', subscriptionRouter);

//start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});