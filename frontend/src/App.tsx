import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f7f8fa', minHeight: '100vh' }}>
      <header style={{ background: '#1a202c', color: '#fff', padding: '1rem 2rem', fontSize: '1.5rem', fontWeight: 700 }}>
        TokenWise Dashboard
      </header>
      <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <Dashboard />
      </main>
    </div>
  );
}

export default App; 