import { useEffect, useState } from 'react';
import api from '../utils/api';

export interface Insights {
  summary: { buy?: number; sell?: number };
  net: number;
  repeatedWallets: { wallet_address: string; count: number }[];
  protocolUsage: { name: string; count: number }[];
}

function toISOStringIfLocal(dt?: string) {
  return dt ? new Date(dt).toISOString() : undefined;
}

export function useInsights(filters: { start?: string; end?: string } = {}) {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const apiFilters = {
      ...filters,
      start: toISOStringIfLocal(filters.start),
      end: toISOStringIfLocal(filters.end),
    };
    api.get('/insights', { params: apiFilters })
      .then(res => setInsights(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { insights, loading, error };
} 