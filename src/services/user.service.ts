import bcrypt from 'bcrypt';
import db from '../database/db.js';


function getCurrentUser(userId: string) {
  return db
    .prepare(
      'SELECT id, email, role, created_at FROM users WHERE id=? AND is_deleted=0'
    )
    .get(userId);
}

function updateCurrentUser(
  userId: string,
  data: { email?: string }
) {
  if (data.email) {
    db.prepare(
      'UPDATE users SET email=? WHERE id=? AND is_deleted=0'
    ).run(data.email, userId);
  }

  return getCurrentUser(userId);
}


function updateCurrentUserPassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const user = db
    .prepare(
      'SELECT password_hash FROM users WHERE id=? AND is_deleted=0'
    )
    .get(userId) as { password_hash: string } | undefined;

  if (!user) {
    throw new Error('User not found');
  }

  const valid = bcrypt.compareSync(oldPassword, user.password_hash);
  if (!valid) {
    throw new Error('Old password is incorrect');
  }

  const newHash = bcrypt.hashSync(newPassword, 10);

  db.prepare(
    'UPDATE users SET password_hash=? WHERE id=?'
  ).run(newHash, userId);
}

function deleteCurrentUser(userId: string) {
  db.prepare(
    'UPDATE users SET is_deleted=1, deleted_at=CURRENT_TIMESTAMP WHERE id=?'
  ).run(userId);
}

export {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  deleteCurrentUser
};