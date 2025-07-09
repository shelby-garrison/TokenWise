import { connection } from './solanaClient';
import { TOKEN_MINT } from '../config';
import { PublicKey } from '@solana/web3.js';

let holdersCache: { wallet_address: string; token_quantity: number }[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getTopHolders(): Promise<{ wallet_address: string; token_quantity: number }[]> {
  const now = Date.now();
  if (holdersCache.length > 0 && now - lastFetch < CACHE_DURATION) {
    return holdersCache;
  }
  const mintPubkey = new PublicKey(TOKEN_MINT);
  const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

  // Fetch all token accounts for the mint
  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        { dataSize: 165 }, // size of token account
        { memcmp: { offset: 0, bytes: mintPubkey.toBase58() } }, // mint filter
      ],
    }
  );

  const holders = accounts
    .map((acc) => {
      // @ts-ignore
      const info = acc.account.data.parsed.info;
      return {
        wallet_address: info.owner,
        token_quantity: parseFloat(info.tokenAmount.uiAmountString),
      };
    })
    .filter((h) => h.token_quantity > 0)
    .sort((a, b) => b.token_quantity - a.token_quantity)
    .slice(0, 60);

  holdersCache = holders;
  lastFetch = now;
  return holders;
}