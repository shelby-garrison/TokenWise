import { useEffect, useState } from 'react';
import api from '../utils/api';

export interface Transaction {
  id: number;
  signature: string;
  wallet_address: string;
  timestamp: string;
  amount: number;
  direction: 'buy' | 'sell';
  protocol_name: string;
  token_mint: string;
}

function toISOStringIfLocal(dt?: string) {
  return dt ? new Date(dt).toISOString() : undefined;
}

export function useTransactions(filters: { start?: string; end?: string; wallet?: string; protocol?: string } = {}, pollInterval = 10000) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let timer: NodeJS.Timeout;
    const fetchTxs = () => {
      setLoading(true);
      const apiFilters = {
        ...filters,
        start: toISOStringIfLocal(filters.start),
        end: toISOStringIfLocal(filters.end),
      };
      api.get('/transactions', { params: apiFilters })
        .then(res => { if (mounted) setTransactions(res.data); })
        .catch(e => { if (mounted) setError(e.message); })
        .finally(() => { if (mounted) setLoading(false); });
    };
    fetchTxs();
    timer = setInterval(fetchTxs, pollInterval);
    return () => { mounted = false; clearInterval(timer); };
  }, [JSON.stringify(filters), pollInterval]);

  return { transactions, loading, error };
} 