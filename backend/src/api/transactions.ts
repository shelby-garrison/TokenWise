import { Router } from 'express';
import { getTransactions, exportTransactions, getTransactionsSummary } from '../services/transactionService';

const router = Router();

router.get('/', async (req, res) => {
  const { start, end, wallet, protocol } = req.query;
  const txs = await getTransactions({ start: start as string, end: end as string, wallet: wallet as string, protocol: protocol as string });
  res.json(txs);
});

router.get('/export', async (req, res) => {
  const { format = 'csv', start, end, wallet, protocol } = req.query;
  const data = await exportTransactions(format as 'csv' | 'json', { start: start as string, end: end as string, wallet: wallet as string, protocol: protocol as string });
  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } else {
    res.setHeader('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.send(data);
  }
});

router.get('/summary', async (req, res) => {
  const { start, end } = req.query;
  const summary = await getTransactionsSummary({ start: start as string, end: end as string });
  res.json(summary);
});

export default router; 