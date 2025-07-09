# TokenWise

TokenWise is a real-time intelligence tool for monitoring and analyzing wallet behavior for a specific Solana token.

## Features
- Discover top 60 token holders
- Real-time monitoring of token-related transactions (buys/sells)
- Protocol detection (Jupiter, Raydium, Orca)
- Insights dashboard (market trends, repeated activity, protocol usage)
- Historical analysis with time filters
- Exportable reports (CSV/JSON)

## Architecture
- **Backend:** Node.js, TypeScript, Express, PostgreSQL, @solana/web3.js, PostgreSQL
- **Frontend:** React.js (see frontend/)
- **DevOps:** Docker Compose for local dev

## Quickstart
1. Clone the repo
2. Set up `.env` in backend (see backend/README.md)
3. Run `docker-compose up --build` 
4. Access backend API at `http://localhost:4000`
5. Access the app at `http://localhost:3000`

See backend/README.md for backend details. 