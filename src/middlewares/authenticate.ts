import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import {env} from'../config/env.js';

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    role: string;
  };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token!,
      env.ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    if (
      typeof decoded.sub !== 'string' ||
      typeof decoded.role !== 'string'
    ) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = {
      sub: decoded.sub,
      role: decoded.role
    };

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}