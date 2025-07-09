import { Router } from 'express';
import { getDashboardInsights } from '../services/insightService';

const router = Router();

router.get('/', async (req, res) => {
  const { start, end } = req.query;
  const insights = await getDashboardInsights({ start: start as string, end: end as string });
  res.json(insights);
});

export default router; 