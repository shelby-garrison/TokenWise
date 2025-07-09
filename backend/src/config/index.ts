import dotenv from 'dotenv';
dotenv.config();
 
export const DB_URL = process.env.DATABASE_URL || '';
export const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || '';
export const TOKEN_MINT = process.env.TOKEN_MINT || '';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000; 