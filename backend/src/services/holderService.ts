import { pool } from '../db';
import { getTopHolders } from '../blockchain/tokenHolders';

export async function updateHoldersInDB() {
  const holders = await getTopHolders();
  for (const h of holders) {
    await pool.query(
      'INSERT INTO holders (wallet_address, token_quantity, last_updated) VALUES ($1, $2, NOW()) ON CONFLICT (wallet_address) DO UPDATE SET token_quantity = EXCLUDED.token_quantity, last_updated = NOW()',
      [h.wallet_address, h.token_quantity]
    );
  }
}

export async function getTopHoldersFromDB() {
  const res = await pool.query('SELECT wallet_address, token_quantity FROM holders ORDER BY token_quantity DESC LIMIT 60');
  return res.rows;
} 