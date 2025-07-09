import { pool } from '../db';

export async function getDashboardInsights({ start, end }: { start?: string, end?: string }) {
  // Total buys vs sells
  const summaryRes = await pool.query(
    `SELECT direction, COUNT(*) as count FROM transactions WHERE ($1::timestamp IS NULL OR timestamp >= $1::timestamp) AND ($2::timestamp IS NULL OR timestamp <= $2::timestamp) GROUP BY direction`,
    [start || null, end || null]
  );
  const summary = Object.fromEntries(summaryRes.rows.map(r => [r.direction, parseInt(r.count)]));

  // Net direction
  const netRes = await pool.query(
    `SELECT SUM(CASE WHEN direction='buy' THEN amount ELSE -amount END) as net FROM transactions WHERE ($1::timestamp IS NULL OR timestamp >= $1::timestamp) AND ($2::timestamp IS NULL OR timestamp <= $2::timestamp)`,
    [start || null, end || null]
  );
  const net = netRes.rows[0]?.net || 0;

  // Wallets with repeated activity
  const repeatRes = await pool.query(
    `SELECT wallet_address, COUNT(*) as count FROM transactions WHERE ($1::timestamp IS NULL OR timestamp >= $1::timestamp) AND ($2::timestamp IS NULL OR timestamp <= $2::timestamp) GROUP BY wallet_address HAVING COUNT(*) > 1 ORDER BY count DESC LIMIT 10`,
    [start || null, end || null]
  );

  // Protocol usage breakdown
  const protoRes = await pool.query(
    `SELECT p.name, COUNT(*) as count FROM transactions t LEFT JOIN protocols p ON t.protocol_id = p.id WHERE ($1::timestamp IS NULL OR t.timestamp >= $1::timestamp) AND ($2::timestamp IS NULL OR t.timestamp <= $2::timestamp) GROUP BY p.name`,
    [start || null, end || null]
  );

  return {
    summary,
    net,
    repeatedWallets: repeatRes.rows,
    protocolUsage: protoRes.rows,
  };
} 