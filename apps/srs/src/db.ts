import postgres from 'postgres';

export const sql = postgres({
  password: process.env.DB_PASSWORD ?? 'postgres123',
  username: process.env.DB_USER ?? 'postgres',
  host: process.env.DB_HOST ?? 'localhost'
}); // will use psql environment variables
