const getIssueLabels = async (i, octokit, repoOwner, repoName) => {
    try {
        const issue = await octokit.paginate(
            "GET /repos/{owner}/{repo}/issues/{issue_number}",
            {
                owner: repoOwner,
                repo: repoName,
                issue_number: String(i),
            },
        );

        if (issue.length > 0 && issue[0].labels.length > 0) {
            return issue[0].labels.map((label) => label.name);
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching issue ${i}:`, error);
        return null;
    }
};

export default getIssueLabels;