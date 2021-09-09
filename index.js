const github = require('@actions/github')
const core = require('@actions/core')

// attempt to keep the GH repo active so workflows 

async function run() {
  try {

    //  - uses: actions/keep-GH-active@v1
    //    with:
    //      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

    const token = core.getInput('GITHUB_TOKEN')
    const owner = core.getInput('GITHUB_OWNER')
    const repo = core.getInput('GITHUB_REPOSITORY')

    const octokit = github.getOctokit('token')

    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: 1,
      mediaType: {
        format: 'diff'
      }
    });

    console.log(pullRequest);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();