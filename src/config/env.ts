import dotenv from 'dotenv';

dotenv.config();


function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  ACCESS_TOKEN_SECRET: requireEnv('ACCESS_TOKEN_SECRET'),
  REFRESH_TOKEN_SECRET: requireEnv('REFRESH_TOKEN_SECRET')
};