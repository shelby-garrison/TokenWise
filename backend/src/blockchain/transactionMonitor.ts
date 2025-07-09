import { connection } from './solanaClient';
import { TOKEN_MINT } from '../config';
import { pool } from '../db';
import { detectProtocol } from '../utils/protocolDetector';
import { getTopHolders } from './tokenHolders';
import { PublicKey } from '@solana/web3.js';
import { getLastSignature, setLastSignature } from '../db/monitorState';
import fs from 'fs';

let running = false;

export async function startTransactionMonitor() {
  if (running) return;
  running = true;

  const mintPubkey = new PublicKey(TOKEN_MINT);

  // Get last processed signature from DB
  let lastSignature: string | undefined = await getLastSignature();
  console.log(`[Monitor] Starting. Last processed signature: ${lastSignature}`);

  async function poll() {
    try {
      const holders = await getTopHolders();
      const holderSet = new Set(holders.map(h => h.wallet_address));
      const sigs = await connection.getSignaturesForAddress(mintPubkey, { before: lastSignature }, 'confirmed');
      if (sigs.length === 0) {
        setTimeout(poll, 5000);
        return;
      }
      let newLastSignature = lastSignature;
      for (const sig of sigs.reverse()) {
        newLastSignature = sig.signature;
        try {
          const tx = await connection.getParsedTransaction(
            sig.signature,
            { commitment: 'confirmed', maxSupportedTransactionVersion: 0 }
          );
          if (!tx || !tx.meta || !tx.transaction) continue;
          const instructions = tx.transaction.message.instructions;
          const protocol = detectProtocol(instructions as any);
          const pre = tx.meta.preTokenBalances || [];
          const post = tx.meta.postTokenBalances || [];
          for (let i = 0; i < pre.length; i++) {
            const preBal = pre[i];
            const postBal = post.find(b => b.owner === preBal.owner);
            if (!postBal) continue;
            const preAmount = parseFloat(preBal.uiTokenAmount?.uiAmountString ?? '0');
            const postAmount = parseFloat(postBal.uiTokenAmount?.uiAmountString ?? '0');
            const delta = postAmount - preAmount;
            if (delta === 0) continue;
            const direction = delta > 0 ? 'buy' : 'sell';
            const preOwner = preBal.owner ?? '';
            const postOwner = postBal.owner ?? '';
            if (!holderSet.has(preOwner) && !holderSet.has(postOwner)) continue;
            const wallet_address = delta > 0 ? postOwner : preOwner;
            let protocol_id: number | null = null;
            if (protocol !== 'Unknown') {
              const res = await pool.query('INSERT INTO protocols (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id', [protocol]);
              protocol_id = res.rows[0].id;
            }
            try {
              await pool.query(
                'INSERT INTO transactions (signature, wallet_address, timestamp, amount, direction, protocol_id, token_mint) VALUES ($1, $2, to_timestamp($3), $4, $5, $6, $7) ON CONFLICT DO NOTHING',
                [sig.signature, wallet_address, sig.blockTime || Math.floor(Date.now()/1000), Math.abs(delta), direction, protocol_id, TOKEN_MINT]
              );
            } catch (insertErr) {
              console.error(`[Monitor] DB insert error for signature ${sig.signature}:`, insertErr);
              fs.appendFileSync('monitor_errors.log', `[${new Date().toISOString()}] DB insert error for signature ${sig.signature}: ${insertErr}\n`);
            }
          }
        } catch (txErr) {
          console.error(`[Monitor] Error processing transaction ${sig.signature}:`, txErr);
          fs.appendFileSync('monitor_errors.log', `[${new Date().toISOString()}] Error processing transaction ${sig.signature}: ${txErr}\n`);
        }
      }
      // Persist the new last signature only after all are processed
      await setLastSignature(newLastSignature!);
      lastSignature = newLastSignature;
      console.log(`[Monitor] Updated lastSignature to: ${lastSignature}`);
    } catch (e) {
      console.error('[Monitor] Polling error:', e);
      fs.appendFileSync('monitor_errors.log', `[${new Date().toISOString()}] Polling error: ${e}\n`);
    }
    setTimeout(poll, 5000);
  }
  poll();
} 