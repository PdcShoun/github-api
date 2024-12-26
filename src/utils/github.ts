import dotenv from 'dotenv'

type FetchMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

dotenv.config()
const GITHUB_URL = process.env.GITHUB_URL || 'https://api.github.com'

export async function createGithubRepo(
  token: string,
  owner: string,
  repo: string
) {
  const data = await fetchGithubApi(token, `/user/repos`, 'POST', {
    name: repo,
    description: 'This is your first repository',
    private: true,
  })
  return data
}

export async function getGithubRepos(token: string) {
  const username = await getGithubUsername(token)
  const data = await fetchGithubApi(token, `/users/${username}/repos`, 'GET')
  return data
}

export async function getGithubUsername(token: string): Promise<string> {
  const data = await fetchGithubApi(token, `/user`, 'GET', {})
  const { login } = data
  return login
}

export async function deleteGithubRepo(
  token: string,
  owner: string,
  repo: string
) {
  const data = await fetchGithubApi(
    token,
    `/repos/${owner}/${repo}`,
    'DELETE',
    {}
  )
  return data
}

export async function getGithupPullRequestRepo(
  token: string,
  repoName: string
) {
  const username = await getGithubUsername(token)
  const data = await fetchGithubApi(
    token,
    `/repos/${username}/${repoName}/pulls`,
    'GET'
  )
  return data
}

async function fetchGithubApi(
  token: string,
  path: string,
  method: FetchMethod,
  body: any = null
) {
  const res = await fetch(`${GITHUB_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: method !== 'GET' ? JSON.stringify(body) : null,
  })
  const data = await res.json()
  if (res.ok) {
    return data
  }
  console.error(data)
  throw new Error(data.message)
}
type Label = {
  id: number
  name: string
}
type PullRequest = {
  labels: Label[]
}
export async function mergeGithubPullRequest(
  token: string,
  repoName: string,
  prId: string
) {
  const username = await getGithubUsername(token)
  const data: PullRequest = await fetchGithubApi(
    token,
    `/repos/${username}/${repoName}/pulls/${prId}`,
    'GET'
  )
  if (data.labels.some((label) => label.name === 'do not merge')) {
    throw new Error("Pull request has label 'do not merge'")
  }
  const result = await fetchGithubApi(
    token,
    `/repos/${username}/${repoName}/pulls/${prId}/merge`,
    'PUT',
    {
      commit_title: 'Merge pull request',
      commit_message: 'Merge pull request',
      merge_method: 'merge',
    }
  )

  return result
}
