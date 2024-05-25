async function createMarkdown(data, issueUrl) {
    let markdown = "";

    data.map((row) => {
        markdown += "\n";
        markdown += `## ${row.name} (PR: [#${row.prNumber}](${issueUrl}${row.prNumber})) \n**Release Changes**\n\n`;
        let labels = { fixed: [] };
        row.I.map((issue) => {
            if (issue.labels) {
                labels = {
                    ...labels,
                    [issue.labels[0]]: { title: issue.title, number: issue.number },
                };
            } else {
                labels.fixed.push({ title: issue.title, number: issue.number });
            }
        });
        if (labels.fixed.length > 0) {
            markdown += "### Fixed \n";
            labels.fixed.map(
                (fixed) =>
                    (markdown += `- ${fixed.title} (ISSUE: [#${fixed.number}](${issueUrl}${fixed.number}))\n`),
            );
        }

        Object.keys(labels).map((label) => {
            if (label !== "fixed") {
                markdown += `### ${label.charAt(0).toUpperCase() + label.slice(1)} \n`;
                markdown += `- ${labels[label].title} (ISSUE: [#${labels[label].number}](${issueUrl}${labels[label].number}))\n`;
            }
        });
    });

    return markdown
}

export default createMarkdown;