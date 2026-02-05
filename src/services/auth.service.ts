import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { findUserByEmail, createUser } from '../models/user.model.js';
import {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshTokens
} from '../models/refreshToken.model.js';

async function registerUser(email: string, password: string) {
  const hash = await bcrypt.hash(password, 10);
  createUser(uuid(), email, hash);
}

async function loginUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const payload = { sub: user.id, role: user.role };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m'
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d'
  });

  saveRefreshToken(
    uuid(),
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  );

  return { accessToken, refreshToken };
}

function refreshAccessToken(token: string) {
  const stored = findRefreshToken(token);
  if (!stored) throw new Error('Invalid refresh token');

  const payload = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET!
  ) as { sub: string; role: string };

  return jwt.sign(
    { sub: payload.sub, role: payload.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' }
  );
}

function logoutUser(userId: string) {
  deleteRefreshTokens(userId);
}

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
};