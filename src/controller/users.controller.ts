import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/authenticate.js';
import {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  deleteCurrentUser
} from '../services/user.service.js'; 

function getMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = getCurrentUser(req.user.sub);
  return res.json(user);
}

function updateMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const updatedUser = updateCurrentUser(req.user.sub, req.body);
  return res.json(updatedUser);
}

function updatePassword(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { oldPassword, newPassword } = req.body as {
    oldPassword?: string;
    newPassword?: string;
  };

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: 'Old password and new password are required'
    });
  }

  updateCurrentUserPassword(req.user.sub, oldPassword, newPassword);

  return res.json({ message: 'Password updated successfully' });
}

function deleteMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  deleteCurrentUser(req.user.sub);
  return res.json({ message: 'User account deleted' });
}

export {
  
  getMe,
  updateMe,
  updatePassword,
  deleteMe
};