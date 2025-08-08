// scripts/gitTimestamps.js
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import fg from "fast-glob";
import matter from "gray-matter";
import fetch from "node-fetch";

const OWNER = "YOUR_GITHUB_USERNAME";
const REPO = "YOUR_REPO_NAME";
const BRANCH = "main";
const TOKEN = process.env.GITHUB_TOKEN || null;

if (!TOKEN) {
  console.warn("No GITHUB_TOKEN set. Requests limited to 60/hr.");
}

function runGitCommand(cmd) {
  try {
    return execSync(cmd, { encoding: "utf-8" }).trim();
  } catch {
    return null;
  }
}

function getLocalTimestamps(filePath) {
  const logFormat = "%H|%aI"; // commit hash | ISO date
  const gitCmd = `git log --follow --format=${logFormat} -- "${filePath}"`;
  const output = runGitCommand(gitCmd);
  if (!output) return null;

  const lines = output.split("\n").map(l => {
    const [hash, date] = l.split("|");
    return { hash, date };
  });

  return {
    updated: lines[0],
    created: lines[lines.length - 1]
  };
}

async function getGitHubTimestamps(filePath) {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath}&sha=${BRANCH}&per_page=100`;
  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": "astro-timestamp-script",
      ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {})
    }
  });

  if (!res.ok) {
    throw new Error(`GitHub API error for ${filePath}: ${res.status} ${res.statusText}`);
  }

  const commits = await res.json();
  if (!Array.isArray(commits) || commits.length === 0) return null;

  return {
    updated: {
      hash: commits[0].sha,
      date: commits[0].commit.author.date
    },
    created: {
      hash: commits[commits.length - 1].sha,
      date: commits[commits.length - 1].commit.author.date
    }
  };
}

async function main() {
  const files = await fg([
    "src/pages/projects/**/*.{md,astro}"
  ]);

  const timestamps = {};
  const mismatches = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const { data: frontmatter } = matter(content);

    if (frontmatter.timestamps === true) {
      const relativePath = path.relative(process.cwd(), file).replace(/\\/g, "/");
      const slug = path.basename(file, path.extname(file)); // filename without extension

      console.log(`\nProcessing ${relativePath} as slug: "${slug}"...`);

      let localData = getLocalTimestamps(relativePath);
      let githubData = null;

      if (!localData) {
        console.log("No local git history, fetching from GitHub...");
        githubData = await getGitHubTimestamps(relativePath);
        if (!githubData) {
          console.warn(`No git history found for ${relativePath}`);
          continue;
        }
        timestamps[slug] = {
          fullPath: relativePath,
          created: githubData.created.date,
          updated: githubData.updated.date,
          integrity: "from-github"
        };
        continue;
      }

      githubData = await getGitHubTimestamps(relativePath);

      let integrity = "verified";

      if (
        !githubData ||
        localData.created.hash !== githubData.created.hash ||
        localData.updated.hash !== githubData.updated.hash
      ) {
        integrity = "hash-mismatch";
        mismatches.push(relativePath);
      }

      timestamps[slug] = {
        fullPath: relativePath,
        created: localData.created.date,
        updated: localData.updated.date,
        integrity
      };

      console.log(
        integrity === "verified"
          ? `Verified: Created ${localData.created.date}, Updated ${localData.updated.date}`
          : `Hash mismatch!`
      );
    }
  }

  const outPath = path.join(process.cwd(), "src", "utility", "timestamps.json");

  // ensure utility folder exists
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify(timestamps, null, 2));
  console.log(`\ntimestamps.json saved to ${outPath}`);

  if (mismatches.length) {
    console.log("\nmismatched files:");
    mismatches.forEach(f => console.log(`  - ${f}`));
  } else {
    console.log("\n all verified — no mismatches found!");
  }
}

main().catch(err => {
  console.error("Script failed:", err);
  process.exit(1);
});
