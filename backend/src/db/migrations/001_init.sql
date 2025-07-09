-- Holders table
CREATE TABLE IF NOT EXISTS holders (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(64) UNIQUE NOT NULL,
    token_quantity NUMERIC NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Protocols table
CREATE TABLE IF NOT EXISTS protocols (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    signature VARCHAR(128) UNIQUE NOT NULL,
    wallet_address VARCHAR(64) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    amount NUMERIC NOT NULL,
    direction VARCHAR(8) NOT NULL, -- 'buy' or 'sell'
    protocol_id INTEGER REFERENCES protocols(id),
    token_mint VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add composite unique constraint to prevent duplicate events
ALTER TABLE transactions
ADD CONSTRAINT unique_tx_event UNIQUE (wallet_address, amount, timestamp, direction, protocol_id, token_mint);

CREATE INDEX IF NOT EXISTS idx_transactions_wallet_address ON transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_transactions_protocol_id ON transactions(protocol_id); 

CREATE TABLE IF NOT EXISTS monitor_state (
    id SERIAL PRIMARY KEY,
    key VARCHAR(64) UNIQUE NOT NULL,
    value VARCHAR(256) NOT NULL
); 