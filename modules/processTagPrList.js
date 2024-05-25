import getIssueTitle from "./getIssueTitle.js";
import getIssueLabels from "./getIssueLabels.js";

const processTagPrList = async (tagPrList, octokit, repoOwner, repoName) => {
    const tagPrListWithIssueNumbers = await Promise.all(
        tagPrList.map(async (current, index, array) => {
            const next = array[index + 1];
            const intermediateNumbers = [];

            if (next) {
                for (let i = next.prNumber + 1; i < current.prNumber; i++) {
                    try {
                        const issueTitle = await getIssueTitle(i, octokit, repoOwner, repoName);
                        const labels = await getIssueLabels(i, octokit, repoOwner, repoName);

                        intermediateNumbers.push({ number: i, title: issueTitle, labels });
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                for (let i = current.prNumber - 1; i >= 1; i--) {
                    try {
                        const issueTitle = await getIssueTitle(i, octokit, repoOwner, repoName);
                        const labels = await getIssueLabels(i, octokit, repoOwner, repoName);

                        intermediateNumbers.push({ number: i, title: issueTitle, labels });
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            return {
                ...current,
                I: intermediateNumbers,
            };
        }),
    );

    return tagPrListWithIssueNumbers.filter((item) => item.I.length > 0);
};

export default processTagPrList