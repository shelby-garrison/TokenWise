import { PORT } from './config';
import { pool } from './db';
import app from './api';
import { startTransactionMonitor } from './blockchain/transactionMonitor';
import { updateHoldersInDB } from './services/holderService';

app.listen(PORT, async () => {
  console.log(`TokenWise backend running on port ${PORT}`);
  await updateHoldersInDB();
  setInterval(updateHoldersInDB, 5 * 60 * 1000);
  startTransactionMonitor();
}); 