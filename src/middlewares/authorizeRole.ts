import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './authenticate.js';

export function authorizeRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}