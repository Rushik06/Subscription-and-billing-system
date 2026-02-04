import type { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export function applySecurityMiddlewares(app: Express): void {
  // Helmet
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: '*', // safe for assignment & Postman
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP
    standardHeaders: true,
    legacyHeaders: false
  });

  app.use(limiter);
}