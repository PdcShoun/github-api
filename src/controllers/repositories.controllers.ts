import { Request, Response } from 'express';

import {
  getGithubRepos,
  createGithubRepo,
  deleteGithubRepo,
  getGithupPullRequestRepo,
  mergeGithubPullRequest
} from '../utils/github';

export async function getRepositories(req: Request, res: Response) {
  const githubToken = req.headers.authorization as string;
  try {
    const repos = await getGithubRepos(githubToken);
    res.json({ repos });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'something wrong' });
    }
  }
}

export async function createRepository(req: Request, res: Response) {
  try {
    const { repository_name, owner } = req.body;
    const githubToken = req.headers.authorization as string;
    const data = await createGithubRepo(githubToken, owner, repository_name);
    res.json({ data });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'something wrong' });
    }
  }
}

export async function deleteRepository(req: Request, res: Response) {
  try {
    const { repository_name, owner } = req.body;
    const githubToken = req.headers.authorization as string;
    await deleteGithubRepo(githubToken, owner, repository_name);
    res.status(204);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'something wrong' });
    }
  }
}

export async function getPullRequestRepo(req: Request, res: Response) {
  try {
    const githubToken = req.headers.authorization as string;
    const { repositoryName } = req.params;
    const pullRequest = await getGithupPullRequestRepo(
      githubToken,
      repositoryName
    );
    res.json({ pull_request: pullRequest });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'something wrong' });
    }
  }
}

export async function mergePullRequest(req: Request, res: Response) {
  try {
    const githubToken = req.headers.authorization as string;
    const { repositoryName, prId } = req.params;
    const result = await mergeGithubPullRequest(
      githubToken,
      repositoryName,
      prId
    );
    res.json({ result });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ error: 'something wrong' });
    }
  }
}
