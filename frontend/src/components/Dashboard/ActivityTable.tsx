import React from 'react';
import { useTransactions, Transaction } from '../../hooks/useTransactions';
import { format } from 'date-fns';

interface Props {
  start?: string;
  end?: string;
  wallet?: string;
  protocol?: string;
}

const ActivityTable: React.FC<Props> = ({ start, end, wallet, protocol }) => {
  const { transactions, loading, error } = useTransactions({ start, end, wallet, protocol });

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Recent Transactions</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f1f1' }}>
              <th style={{ padding: 8 }}>Time</th>
              <th style={{ padding: 8 }}>Wallet</th>
              <th style={{ padding: 8 }}>Amount</th>
              <th style={{ padding: 8 }}>Direction</th>
              <th style={{ padding: 8 }}>Protocol</th>
              <th style={{ padding: 8 }}>Signature</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: Transaction) => (
              <tr key={tx.signature} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{format(new Date(tx.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td style={{ padding: 8, fontFamily: 'monospace' }}>{tx.wallet_address}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{tx.amount.toLocaleString()}</td>
                <td style={{ padding: 8, color: tx.direction === 'buy' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>{tx.direction.toUpperCase()}</td>
                <td style={{ padding: 8 }}>{tx.protocol_name || 'Unknown'}</td>
                <td style={{ padding: 8, fontFamily: 'monospace' }}>{tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable; 