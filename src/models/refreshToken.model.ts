import db from '../database/db.js';

 const saveRefreshToken = (
  id: string,
  userId: string,
  token: string,
  expiresAt: string
) =>
  db.prepare(
    'INSERT INTO refresh_tokens VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)'
  ).run(id, userId, token, expiresAt);

const findRefreshToken = (token: string) =>
  db.prepare('SELECT * FROM refresh_tokens WHERE token=?').get(token);

const deleteRefreshTokens = (userId: string) =>
  db.prepare('DELETE FROM refresh_tokens WHERE user_id=?').run(userId);

export {saveRefreshToken,findRefreshToken,deleteRefreshTokens};