# auto-changelog-generator

`auto-changelog-generator` is a tool for generating changelogs automatically from GitHub issues and pull requests.

## Features

- Fetches issues and pull requests from GitHub.
- Generates markdown formatted changelogs.
- Supports filtering by labels and milestones.

## Installation

```sh
npm install auto-changelog-generator
```

## Usage

```js
import createMarkdownText from "auto-changelog-generator";

const options = {
  githubToken: GITHUB_TOKEN,
  repoOwner: REPO_OWNER,
  repoName: REPO_NAME,
}

createMarkdownText(options).then((text) => console.log(text));
```

## Contributing

Feel free to open issues or submit pull requests for enhancements and bug fixes.

## License

This project is licensed under the MIT License. See
the [LICENSE](https://github.com/aliezzahn/auto-changelog-generator/blob/main/LICENSE) file for details.

---

For more details, visit the [npm package page](https://www.npmjs.com/package/auto-changelog-generator).