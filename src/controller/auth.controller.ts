/* eslint-disable */
import type { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
} from '../services/auth.service.js';
import type { AuthRequest } from '../middlewares/authenticate.js';

async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("email",email);
    console.log("pass",password)
    const tokens = await loginUser(email, password);
    console.log("token",tokens)
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
    console.log("error",err);
  }
}

function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    const accessToken = refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
}

function logout(req: AuthRequest, res: Response) {
  try {
    logoutUser(req.user!.sub);
    res.json({ message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export {
  register,
  login,
  refreshToken,
  logout
};