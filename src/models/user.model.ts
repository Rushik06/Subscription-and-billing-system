import db from '../database/db.js';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  is_deleted: number;
  deleted_at: string | null;
  created_at: string;
}

const findUserByEmail = (email: string): User | undefined =>
  db
    .prepare('SELECT * FROM users WHERE email=? AND is_deleted=0')
    .get(email) as User | undefined;

const findUserById = (id: string): Pick<User, 'id' | 'email' | 'role'> | undefined =>
  db
    .prepare('SELECT id,email,role FROM users WHERE id=?')
    .get(id) as Pick<User, 'id' | 'email' | 'role'> | undefined;

const createUser = (id: string, email: string, hash: string) =>
  db.prepare(
    "INSERT INTO users VALUES (?, ?, ?, 'USER', 0, NULL, CURRENT_TIMESTAMP)"
  ).run(id, email, hash);

export { findUserByEmail, findUserById, createUser };