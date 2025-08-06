import { execSync } from 'node:child_process';
import path from 'path';

export function getGitTimestamps(filePath) {
  const absPath = path.resolve(filePath);

  try {
    const created = execSync(
      `git log --diff-filter=A --follow --format=%aI -1 -- "${absPath}"`
    ).toString().trim();

    const lastEdited = execSync(
      `git log -1 --format=%aI -- "${absPath}"`
    ).toString().trim();

    return { created, lastEdited };
  } catch (err) {
    console.error(`⚠️ Git error for file: ${absPath}`);
    return { created: null, lastEdited: null };
  }
}
