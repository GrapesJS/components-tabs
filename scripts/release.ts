import fs from 'fs';
import { resolve } from 'path';
import { runCommand } from './common';

const grapesJSCompontentsTabsPath = resolve(__dirname, '.');

async function prepareReleaseGrapesJSompontentsTabs() {
  try {
    const releaseTag = process.argv[2] || 'rc';
    console.log('Prepare release GrapesJS tag:', releaseTag);

    runCommand(
      'git diff-index --quiet HEAD --',
      'You have uncommitted changes. Please commit or stash them before running the release script.',
    );

    // Increment the Components Tabs version
    const versionCmd = releaseTag === 'latest' ? 'patch' : `prerelease --preid ${releaseTag}`;
    runCommand(`npm exec npm version ${versionCmd} --no-git-tag-version --no-commit-hooks`);

    // Create a new release branch
    const newVersion = JSON.parse(fs.readFileSync(`${grapesJSCompontentsTabsPath}/package.json`, 'utf8')).version;
    const newBranch = `release-v${newVersion}`;
    runCommand(`git checkout -b ${newBranch}`);
    runCommand('git add .');
    runCommand(`git commit -m "Release GrapesJS Components Tabs ${releaseTag}: v${newVersion}"`);

    console.log(`Release prepared! Push the current "${newBranch}" branch and open a new PR targeting 'main'`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

prepareReleaseGrapesJSompontentsTabs();
