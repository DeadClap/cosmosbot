import { execSync } from 'child_process';

function getGitBranch(): string {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
    return branch;
  } catch (error) {
    console.error('Error Fetching git branch: ', error);
    return 'unknown';
  }
}

export default getGitBranch;
