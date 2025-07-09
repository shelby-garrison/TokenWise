import React from 'react';
import { useInsights } from '../../hooks/useInsights';

const InsightsPanel: React.FC<{ start?: string; end?: string }> = ({ start, end }) => {
  const { insights, loading, error } = useInsights({ start, end });

  if (loading) return <div>Loading insights...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!insights) return null;

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Market Insights</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 600 }}>Buys</div>
          <div style={{ fontSize: 24, color: '#16a34a' }}>{insights.summary.buy || 0}</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Sells</div>
          <div style={{ fontSize: 24, color: '#dc2626' }}>{insights.summary.sell || 0}</div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Net Direction</div>
          <div style={{ fontSize: 24, color: insights.net >= 0 ? '#16a34a' : '#dc2626' }}>
            {insights.net > 0 ? 'Buy-heavy' : insights.net < 0 ? 'Sell-heavy' : 'Neutral'}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Top Repeated Wallets</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 14 }}>
            {insights.repeatedWallets.map(w => (
              <li key={w.wallet_address} style={{ fontFamily: 'monospace' }}>{w.wallet_address} ({w.count})</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Protocol Usage</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 14 }}>
            {insights.protocolUsage.map(p => (
              <li key={p.name}>{p.name || 'Unknown'}: {p.count}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel; 