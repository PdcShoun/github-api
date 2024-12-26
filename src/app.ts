import express, { Request, Response } from 'express'

import githubRoute from './routes/repositories.route'

const app = express()

app.use(express.json())
app.use('/repositories', githubRoute)

app.get('/', (_req: Request, res: Response) => {
  res.json({ hello: 'world' })
})

export default app
