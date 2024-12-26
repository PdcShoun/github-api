import dotenv from 'dotenv'

type FetchMethod = 'GET' | 'POST' | 'DELETE'

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
