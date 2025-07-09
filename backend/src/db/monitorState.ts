import { pool } from './index';

const KEY = 'lastSignature';

export async function getLastSignature(): Promise<string | undefined> {
  const res = await pool.query('SELECT value FROM monitor_state WHERE key = $1', [KEY]);
  return res.rows[0]?.value;
}

export async function setLastSignature(signature: string): Promise<void> {
  await pool.query(
    `INSERT INTO monitor_state (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [KEY, signature]
  );
} 