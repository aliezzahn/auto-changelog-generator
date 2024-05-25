async function getIssueTitle(i, octokit, repoOwner, repoName) {
    const issue = await octokit.paginate(
        "GET /repos/{owner}/{repo}/issues/{issue_number}",
        {
            owner: repoOwner,
            repo: repoName,
            issue_number: String(i),
        },
    );
    return issue[0].title;
}

export default getIssueTitle