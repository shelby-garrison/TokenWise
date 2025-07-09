import React from 'react';
import { useHolders } from '../../hooks/useHolders';

const TopHolders: React.FC = () => {
  const { holders, loading, error } = useHolders();

  if (loading) return <div>Loading top holders...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Top 60 Holders</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f1f1' }}>
              <th style={{ padding: 8, textAlign: 'left' }}>Rank</th>
              <th style={{ padding: 8, textAlign: 'left' }}>Wallet Address</th>
              <th style={{ padding: 8, textAlign: 'right' }}>Token Quantity</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((h, i) => (
              <tr key={h.wallet_address} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{i + 1}</td>
                <td style={{ padding: 8, fontFamily: 'monospace' }}>{h.wallet_address}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{h.token_quantity.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopHolders; 