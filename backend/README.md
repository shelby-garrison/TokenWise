# TokenWise Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up PostgreSQL and run the migration:
   ```sh
   psql -U postgres -d tokenwise -f src/db/migrations/001_init.sql
   ```
3. Configure `.env` (see `src/config/index.ts` for required variables):
   DATABASE_URL=postgresql://username:password@localhost:5432/tokenwise
   SOLANA_RPC_URL= https://api.mainnet-beta.solana.com OR https://rpc.helius.xyz/?api-key=YOUR_API_KEY(Offers a stable Solana RPC with higher rate limits)
   TOKEN_MINT=9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump
   PORT=4000

## Usage

- Start in dev mode:
  ```sh
  npm run dev
  ```
- Start in prod mode:
  ```sh
  npm start
  ```

## Features
- Tracks top 60 holders of a Solana token
- Monitors real-time transactions (buy/sell, protocol, etc.)
- Provides REST API for holders, transactions, insights, and export
- Supports historical queries and CSV/JSON export 
