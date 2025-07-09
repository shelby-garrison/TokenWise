import { Pool } from 'pg';
import { DB_URL } from '../config';
console.log('Connecting to DB:', DB_URL);
export const pool = new Pool({
  connectionString: DB_URL,
}); 