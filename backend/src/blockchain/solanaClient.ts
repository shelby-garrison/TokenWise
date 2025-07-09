import { Connection, clusterApiUrl } from '@solana/web3.js';
import { SOLANA_RPC_URL } from '../config';
 
export const connection = new Connection(SOLANA_RPC_URL || clusterApiUrl('mainnet-beta'), 'confirmed'); 