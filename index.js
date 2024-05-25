import {Octokit} from "@octokit/rest";
import getTagPrListWithIssues from "./modules/getTagPrListWithIssues.js";
import createMarkdown from "./modules/createMarkdown.js";

async function createMarkdownText(options) {
    const {githubToken, repoOwner, repoName} = options;
    const issueUrl = `https://github.com/${repoOwner}/${repoName}/issues/`;

    const octokit = await new Octokit({
        auth: githubToken,
    });

    try {
        const jsonObject = await getTagPrListWithIssues(octokit, repoOwner, repoName);
        return await createMarkdown(jsonObject, issueUrl);
    } catch (e) {
        console.error(e);
    }
}

export default createMarkdownText;