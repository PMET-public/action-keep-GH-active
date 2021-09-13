const github = require('@actions/github')
const core = require('@actions/core')

// attempt to keep the GH repo active so workflows 

async function run() {
  try {

    //  - uses: actions/keep-GH-active@v1
    //    with:
    //      gh-token: ${{ secrets.GITHUB_TOKEN }}

    const token = core.getInput('gh-token') || process.env.GITHUB_TOKEN
    const repo = process.env.GITHUB_REPOSITORY
    let [owner] = repo.split('/',1),
      project = repo.slice(repo.indexOf('/')+1)

    const octokit = github.getOctokit(token)

    // https://docs.github.com/en/rest/reference/repos#create-a-commit-status

    const { data: prevStatuses } = await octokit.request('GET /repos/{owner}/{repo}/statuses/{commit_sha}', {
      owner: owner,
      repo: project,
      commit_sha: process.env.GITHUB_SHA,
    });

    const { data: newStatus } = await octokit.request('POST /repos/{owner}/{repo}/statuses/{commit_sha}', {
      owner: owner,
      repo: project,
      commit_sha: process.env.GITHUB_SHA,
      state: 'pending',
      description: new Date()
    });

    console.log(prevStatuses, newStatus);


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();