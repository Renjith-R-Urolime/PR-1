// predeploy.js
const { execSync } = require('child_process');
const fs = require('fs');

function getVersionBasedOnChanges(currentVersion) {
  const baseBranch = 'development';
  const gitDiffCmd = `git diff --name-status ${baseBranch}..HEAD`;
  try {
    // const commitLog = execSync(gitLogCmd, { encoding: 'utf-8' }).trim();
    const changedFilesStatus = execSync(gitDiffCmd, { encoding: 'utf-8' }).trim();

    if (!changedFilesStatus) {
      console.log('No changed files. Version remains unchanged.');
      return currentVersion;
    }

    let versionIncrementType = 'patch';
    const changelogEntry = { version: currentVersion, changes: {
        'New Module Files': [],
        'New UI Component Files': [],
        'Bug fix/Improvement': [],
        'Style changes/Improvements': [],
        'Files Renamed': [],
        'Files Deleted': [],
    } };

    const changes = changedFilesStatus.split('\n');

    changes.forEach(fileStatus => {
      const [status, file] = fileStatus.split('\t');

      if (status === 'A') {
        if (file.startsWith('src/pages/') || file.startsWith('src/app/')) {
            categorizeChange(changelogEntry.changes, 'New Module Files', file, 'major');
            versionIncrementType = 'minor'
        } else if (file.endsWith('.css') || file.endsWith('.scss')) {
          categorizeChange(changelogEntry.changes, 'Style changes/Improvements', file, 'minor' );
          versionIncrementType = 'patch'
        } else if (file.startsWith('shared/ui/')) {
          categorizeChange(changelogEntry.changes, 'New UI Component Files', file, 'patch' );
          versionIncrementType = 'patch'
        }
      } else if (status === 'M') {
          if (file.startsWith('src/pages/') || file.startsWith('src/app/')) {
            categorizeChange(changelogEntry.changes, 'Bug fix/Improvement', 'patch', file);
          } else if (file.endsWith('.css') || file.endsWith('.scss')) {
            categorizeChange(changelogEntry.changes, 'Style changes/Improvements', 'patch', file);
          } else if (file.startsWith('shared/ui/')) {
            categorizeChange(changelogEntry.changes, 'Bug fix/Improvement', 'patch', file);
          }
          versionIncrementType = 'patch'
      } else if (status === 'R100') {
            categorizeChange(changelogEntry.changes, 'Files Renamed', file, 'patch');
      } else if (status === 'D') {
            categorizeChange(changelogEntry.changes, 'Files Deleted', file, 'patch');
      }
      versionIncrementType = versionIncrementType === 'major' ? versionIncrementType : versionIncrementType === 'minor' ?  versionIncrementType : 'patch'
    });

    const newVersion =  incrementVersion(currentVersion, versionIncrementType);
    changelogEntry.version = newVersion;

    if (Object.values(changelogEntry.changes).some(category => category.length > 0)) {
      printVersionSummary(versionIncrementType, changelogEntry.changes);
      generateChangelog(changelogEntry);
    } else {
      console.log('No version change needed.');
    }

    return newVersion;
  } catch (error) {
    console.error('Error detecting changes:', error);
    process.exit(1);
  }
}

function categorizeChange(changes, category, type, file) {
  changes[category].push({ type, file });
}

function incrementVersion(version, type) {
  const parts = version.split('.').map(Number);

  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
      parts[2]++;
      break;
    default:
      console.error('Invalid version increment type');
      process.exit(1);
  }

  return parts.join('.');
}

function generateChangelog(changelogEntry) {
  const changelogPath = 'changelog.md';

  try {
    let changelogContent = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf-8') : '';

    changelogContent = `# Changelog\n\n${generateChangelogEntry(changelogEntry)}\n\n${changelogContent}`;

    fs.writeFileSync(changelogPath, changelogContent);
    console.log(`Changelog created: ${changelogPath}`);
  } catch (error) {
    console.error('Error generating changelog:', error);
    process.exit(1);
  }
}

function generateChangelogEntry(entry) {
  return `## Version ${entry.version}\n\n${generateSummaryTable(entry)}`;
}

function generateSummaryTable(entry) {
  const summaryTable = `| Category | Total Files |\n| -------- | ----------- |\n${Object.entries(entry.changes).map(([category, files]) => `| ${category} | ${files.length} |\n`).join('')}`;
  return summaryTable;
}

function printVersionSummary(versionType, changes) {
  console.log(`\nVersion Summary: ${versionType.toUpperCase()} Update\n`);
  let conTable = []
//   console.log(changes)
  Object.entries(changes).map(([category, files]) => {
    conTable.push({
        "Category": category,
        "Total Files": files.length || 0,
    })
  })
  console.table(conTable)
//   console.log(generateSummaryTable({ changes }));
  console.log('\n');
}

function updatePackageJsonVersion() {
  const packageJsonPath = 'package.json';

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const newVersion = getVersionBasedOnChanges(packageJson.version);

    if (newVersion !== packageJson.version) {
      packageJson.version = newVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`Updated package.json version to ${newVersion}`);
      commitAndPushChanges(newVersion);
    } else {
      console.log('No version change needed.');
    }
  } catch (error) {
    console.error('Error updating package.json version:', error);
    process.exit(1);
  }
}

function commitAndPushChanges(newVersion) {
  try {
      // Get the current branch name
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

      // Use the branchName in subsequent operations
      const commitMessage = `Released v${newVersion} and Changelog update`;

      // Commit changes
      execSync(`git add . && git commit -m "${commitMessage}"`);

      // Push changes with --set-upstream using GitHub Secret
      const ghToken = process.env.GH_TOKEN;
      if (!ghToken) {
          console.error('GH_TOKEN environment variable is not set.');
          process.exit(1);
      }
      execSync(`git push --set-upstream origin ${branchName}`, {
          env: Object.assign({}, process.env, {
            GIT_ASKPASS: 'echo',
            GITHUB_TOKEN: ghToken,
        }),
      });


      console.log(`Changes committed and pushed successfully to branch ${branchName}.`);
  } catch (error) {
      console.error('Error committing and pushing changes:', error);
      process.exit(1);
  }
}


updatePackageJsonVersion();