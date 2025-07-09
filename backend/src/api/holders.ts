import { Router } from 'express';
import { getTopHoldersFromDB, updateHoldersInDB } from '../services/holderService';

const router = Router();

router.get('/', async (req, res) => {
  const holders = await getTopHoldersFromDB();
  res.json(holders);
});

router.post('/refresh', async (req, res) => {
  await updateHoldersInDB();
  res.json({ success: true });
});

export default router; 