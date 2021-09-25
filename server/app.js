import express from 'express';
import 'dotenv';
import loginRouter from './routes/login';
const app = express();

app.use('/api/login', loginRouter);

export default app;
