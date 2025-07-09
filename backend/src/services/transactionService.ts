import { pool } from '../db';
import { format } from 'date-fns';

export async function getTransactions({ start, end, wallet, protocol }: { start?: string, end?: string, wallet?: string, protocol?: string }) {
  let query = 'SELECT t.*, p.name as protocol_name FROM transactions t LEFT JOIN protocols p ON t.protocol_id = p.id WHERE 1=1';
  const params: any[] = [];
  if (start) { params.push(start); query += ` AND t.timestamp >= $${params.length}::timestamp`; }
  if (end) { params.push(end); query += ` AND t.timestamp <= $${params.length}::timestamp`; }
  if (wallet) { params.push(wallet); query += ` AND t.wallet_address = $${params.length}`; }
  if (protocol) { params.push(protocol); query += ` AND p.name = $${params.length}`; }
  query += ' ORDER BY t.timestamp DESC LIMIT 1000';
  const res = await pool.query(query, params);
  return res.rows;
}

export async function getTransactionsSummary({ start, end }: { start?: string, end?: string }) {
  let query = `SELECT direction, COUNT(*) as count, SUM(amount) as total FROM transactions WHERE 1=1`;
  const params: any[] = [];
  if (start) { params.push(start); query += ` AND timestamp >= $${params.length}::timestamp`; }
  if (end) { params.push(end); query += ` AND timestamp <= $${params.length}::timestamp`; }
  query += ' GROUP BY direction';
  const res = await pool.query(query, params);
  return res.rows;
}

export async function exportTransactions(formatType: 'csv' | 'json', filters: { start?: string, end?: string, wallet?: string, protocol?: string }) {
  const txs = await getTransactions(filters);
  if (formatType === 'json') {
    return JSON.stringify(txs, null, 2);
  }
  // CSV
  const header = Object.keys(txs[0] || {}).join(',');
  const rows = txs.map(tx => Object.values(tx).map(v => `"${v}"`).join(','));
  return [header, ...rows].join('\n');
} 