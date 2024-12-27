import express, { Request, Response } from 'express';

import repositoriesRoute from './routes/repositories.route';

const app = express();

app.use(express.json());
app.use('/repositories', repositoriesRoute);

app.get('/', (_req: Request, res: Response) => {
  res.json({ hello: 'world' })
});

export default app;
