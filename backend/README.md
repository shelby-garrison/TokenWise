

````markdown
# 🧠 TokenWise Backend

A real-time analytics backend that monitors top holders and token activity on the Solana blockchain.

---

## ⚙️ Setup

1. **Install dependencies**  
   ```
   npm install
````

2. **Set up PostgreSQL and run the migration**
   Ensure you have a PostgreSQL database named `tokenwise`, then run:

   ```sh
   psql -U postgres -d tokenwise -f src/db/migrations/001_init.sql
   ```

3. **Configure `.env`**
   Create a `.env` file in the `backend` directory with the following variables:
   

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/tokenwise

   # Use one of the following RPC URLs:
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   # OR (recommended for production use):
   # SOLANA_RPC_URL=https://rpc.helius.xyz/?api-key=YOUR_API_KEY

   TOKEN_MINT=9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump
   PORT=4000
   ```

---

## 🚀 Usage

* **Start in development mode**

  ```sh
  npm run dev
  ```

* **Start in production mode**

  ```sh
  npm start
  ```

---



```
