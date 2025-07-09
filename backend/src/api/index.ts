import express from 'express';
import cors from 'cors';
import holdersRouter from './holders';
import transactionsRouter from './transactions';
import insightsRouter from './insights';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/holders', holdersRouter);
app.use('/transactions', transactionsRouter);
app.use('/insights', insightsRouter);

export default app; 