/* eslint-disable @typescript-eslint/no-require-imports */
import { message, fail, danger, schedule } from 'danger';
import noConsole from 'danger-plugin-no-console';

// As we can not run a bot for an OSS project, we need to mock the danger.github object
// Create a proxy for danger.github
const mockDangerGitHub = {
  pr: {
    user: {
      login: 'AIArtur :)', // Mock user login
    },
    number: 1,
    title: 'PR',
    body: 'pull request.',
    head: {
      ref: 'feature-branch',
    },
    base: {
      ref: 'main',
    },
  },
  utils: {
    fileContents: async (filePath) => {
      const fs = require('fs'); // Importing fs inside the function
      const path = require('path'); // Importing path inside the function

      // Define folder access restrictions
      const limitFolderAccess = [
        { callee: 'danger-plugin-no-console/dist/index.js', allowedFolder: 'src' },
        // Add more entries as needed
      ];

      // Function to check if the caller is allowed
      function isCallerAllowed(allowedList, filePath) {
        // Capture the stack trace
        const stack = new Error().stack!;
        const callerLines = stack.split('\n'); // Split the stack trace into lines

        const isCalleeListed = allowedList.some((entry) => callerLines.some((line) => line.includes(entry.callee)));

        if (!isCalleeListed) {
          return true; // Return true if the callee is not listed
        }

        const matchedEntry = allowedList.find((entry) => callerLines.some((line) => line.includes(entry.callee)));

        // Check if the filePath starts with the allowed folder
        const isAllowedFolderMatched = filePath.startsWith(matchedEntry.allowedFolder);

        return isAllowedFolderMatched;
      }

      // Check if the caller is allowed
      if (!isCallerAllowed(limitFolderAccess, filePath)) {
        //console.warn(`Access denied: Caller is not allowed to access -> `, filePath);
        return ''; // Return an empty string if the caller is not allowed
      }

      const fullPath = path.join(process.cwd(), filePath); // Get the full path of the file
      try {
        return fs.readFileSync(fullPath, 'utf8'); // Read the file contents
      } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return null; // Return null if the file cannot be read
      }
    },
  },
};

// Use Object.defineProperty to create a read-only property
Object.defineProperty(danger, 'github', {
  value: mockDangerGitHub,
  writable: false, // Make it read-only
});

const { execSync } = require('child_process');

function processESLintResults(results) {
  let errorCount = 0;

  results.forEach((result) => {
    result.messages.forEach((msg) => {
      message(`${msg.message} at ${result.filePath}:${msg.line}:${msg.column}`);
      if (msg.severity === 2) {
        // 2 indicates an error
        errorCount++;
      }
    });
  });

  // Fail the Danger check if there are any errors
  if (errorCount > 0) {
    fail(`ESLint found ${errorCount} error(s). Please fix them before merging.`);
  } else {
    message('ESLint passed successfully.');
  }
}

try {
  const eslintOutput = execSync('npx eslint src --format=json', { stdio: 'pipe' }).toString();
  const results = JSON.parse(eslintOutput);
  processESLintResults(results);
} catch (error) {
  // Log the error for debugging
  if (error.stdout) {
    const output = error.stdout.toString();
    const results = JSON.parse(output);
    processESLintResults(results);
  } else {
    // If there's no output, log a generic error message
    fail('ESLint failed to run. Please check your configuration and code.');
  }
}

// Any file that contains console.log or console.info will fail,
// but files can contain console.error and console.warn
noConsole({ whitelist: ['error', 'warn'] });

/*import todos from 'danger-plugin-todos'
// Using schedule because this is an async task
schedule(todos({
    keywords: ['TODO', 'FIXME', 'TO-DO'],
    repoUrl: false, // for using simple filepaths without links
}))*/

const modifiedMD = danger.git.modified_files.join('\r\n');
message('Changed Files in this PR: \n - ' + modifiedMD);
