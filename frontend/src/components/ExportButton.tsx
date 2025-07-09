import React from 'react';
import api from '../utils/api';

interface Props {
  filters: { start?: string; end?: string; wallet?: string; protocol?: string };
}

const ExportButton: React.FC<Props> = ({ filters }) => {
  const handleExport = async (format: 'csv' | 'json') => {
    const params = { ...filters, format };
    const res = await api.get('/transactions/export', { params, responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions.${format}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <button onClick={() => handleExport('csv')}>Export CSV</button>
      <button onClick={() => handleExport('json')}>Export JSON</button>
    </div>
  );
};

export default ExportButton; 