import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const configPath = path.resolve('docusaurus.config.ts');
const configFileName = 'docusaurus.config.ts';
const versionedDocsPath = path.resolve('versioned_docs');
const versionedSidebarsPath = path.resolve('versioned_sidebars');

function log(message: string) {
  console.log(`[RemoveStableVersion] ${message}`);
}

function checkGitStatus() {
  try {
    const status = execSync(`git status --porcelain ${configFileName}`, { encoding: 'utf8' }).trim();
    if (status) {
      console.error(`\x1b[31mError: ${configFileName} has uncommitted changes. Please commit or stash them before running this script.\x1b[0m`);
      console.error(status);
      process.exit(1);
    }
    log(`${configFileName} is clean. Proceeding...`);
  } catch (error) {
    console.error('An error occurred while checking git status:', error);
    process.exit(1);
  }
}

function modifyConfig() {
  if (!fs.existsSync(configPath)) {
    log('Config file not found.');
    return;
  }
  let content = fs.readFileSync(configPath, 'utf8');

  // Set lastVersion: 'current'
  content = content.replace(/lastVersion:\s*['"]stable['"]/g, "lastVersion: 'current'");

  // Remove stable version from versions object
  // Match stable: { ... } including the comma if present
  content = content.replace(/\s*stable:\s*{[^}]*},?/g, '');

  fs.writeFileSync(configPath, content);
  log('Updated docusaurus.config.ts (set lastVersion to current and removed stable).');
}

function removeFolders() {
  const targets = [
    { path: versionedDocsPath, name: 'versioned_docs' },
    { path: versionedSidebarsPath, name: 'versioned_sidebars' },
  ];

  for (const target of targets) {
    if (fs.existsSync(target.path)) {
      fs.rmSync(target.path, { recursive: true, force: true });
      log(`Deleted ${target.name}.`);
    }
  }
}

try {
  log('Starting removal of stable version...');
  checkGitStatus();
  modifyConfig();
  removeFolders();
  log('Finished successfully.');
} catch (error) {
  console.error('An error occurred:', error);
  process.exit(1);
}
