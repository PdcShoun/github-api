import { Request, Response, NextFunction } from 'express'

export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const githubToken = req.headers.authorization
  if (!githubToken) {
    res.sendStatus(401)
  } else {
    next()
  }
}
