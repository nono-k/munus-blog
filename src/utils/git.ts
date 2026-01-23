import { execSync } from 'node:child_process';

export function getGitInfo(filePath: string | undefined) {
  let updateAt: string | null = null;

  if (filePath) {
    try {
      updateAt = execSync(`git log -1 --format=%ai -- "${filePath}"`, {
        stdio: 'pipe',
      })
        .toString()
        .trim();
    } catch (error) {
      console.error(`Error getting git info for ${filePath}:`, error);
    }
  }

  return { updateAt };
}
