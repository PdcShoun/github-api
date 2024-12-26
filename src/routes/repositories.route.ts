import express from 'express'

import { tokenMiddleware } from '../middlewares/token.middleware'
import {
  createRepository,
  getRepositories,
  deleteRepository,
} from '../controllers/repositories.controllers'

const router = express.Router()

router.use(tokenMiddleware)

router.post('/', createRepository)
router.delete('/', deleteRepository)
router.get('/', getRepositories)

export default router
