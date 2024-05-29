import processTagPrList from "./processTagPrList.js";

async function getTagPrListWithIssues(octokit, repoOwner, repoName) {
  const tagPrList = [];
  try {
    const tagList = await octokit.rest.repos.listTags({
      owner: repoOwner,
      repo: repoName,
    });

    for (const tag of tagList.data) {
      const commit = await octokit.paginate(
        "GET /repos/{owner}/{repo}/commits/{ref}",
        {
          owner: repoOwner,
          repo: repoName,
          ref: tag.commit.sha,
        },
      );
      const regex = /pull request #(\d+)/;
      const match = commit[0].commit.message.match(regex);
      if (match) {
        tagPrList.push({name: tag.name, prNumber: Number(match[1])});
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    tagPrList.pop();
  }

  return await processTagPrList(tagPrList, octokit, repoOwner, repoName);
}

export default getTagPrListWithIssues;