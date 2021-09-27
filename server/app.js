import express from 'express';
import 'dotenv';
import authRouter from './routes/auth';
import { sequelize, sessionMiddleware } from './db';

sequelize.authenticate();

const app = express();

app.use(sessionMiddleware);
app.use('/api/auth', authRouter);

app.get('/api/hello', (req, res) => {
    const count = req.session.count || 0;
    req.session.count = count + 1;
    res.send(`You have visited ${count} times`);
});

export default app;
