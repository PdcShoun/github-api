import express from 'express';

import { tokenMiddleware } from '../middlewares/token.middleware';
import {
  createRepository,
  getRepositories,
  deleteRepository,
  getPullRequestRepo,
  mergePullRequest
} from '../controllers/repositories.controllers';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/', createRepository);
router.delete('/', deleteRepository);
router.get('/', getRepositories);
router.get('/:repositoryName/pull-requests', getPullRequestRepo);
router.post('/:repositoryName/pull-requests/:prId/merge', mergePullRequest);

export default router;
