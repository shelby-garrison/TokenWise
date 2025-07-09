import { useEffect, useState } from 'react';
import api from '../utils/api';

export function useHolders() {
  const [holders, setHolders] = useState<{ wallet_address: string; token_quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/holders')
      .then(res => setHolders(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { holders, loading, error };
} 