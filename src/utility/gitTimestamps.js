// scripts/fetch-timestamps.js
import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";
import fetch from "node-fetch";

const OWNER = "YOUR_GITHUB_USERNAME";
const REPO = "YOUR_REPO_NAME";
const BRANCH = "main"; // or 'master' or whatever your default branch is
const TOKEN = process.env.GITHUB_TOKEN || null;

if (!TOKEN) {
  console.warn("⚠️ No GITHUB_TOKEN set. Requests are limited to 60/hour.");
}

async function getFileTimestamps(filePath) {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=${filePath}&sha=${BRANCH}&per_page=100`;
  const res = await fetch(apiUrl, {
    headers: {
      "User-Agent": "astro-timestamp-script",
      ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error for ${filePath}: ${res.status} ${res.statusText}`);
  }

  const commits = await res.json();
  if (!Array.isArray(commits) || commits.length === 0) {
    return null; // no commits found (shouldn't happen if file exists in repo)
  }

  return {
    updated: commits[0].commit.author.date,
    created: commits[commits.length - 1].commit.author.date,
  };
}

async function main() {
  // Scan content folders for .md and .astro files
  const files = await fg([
    "src/content/posts/**/*.{md,astro}",
    "src/content/webcomics/**/*.{md,astro}",
  ]);

  const timestamps = {};

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const { data: frontmatter } = matter(content);

    if (frontmatter.timestamps === true) {
      // GitHub API needs paths relative to repo root
      const relativePath = path.relative(process.cwd(), file).replace(/\\/g, "/");
      console.log(`⏳ Fetching timestamps for ${relativePath}...`);
      try {
        const times = await getFileTimestamps(relativePath);
        if (times) {
          timestamps[relativePath] = times;
          console.log(`✅ ${relativePath}: Created ${times.created}, Updated ${times.updated}`);
        }
      } catch (err) {
        console.error(`❌ Failed for ${relativePath}:`, err.message);
      }
    }
  }

  fs.writeFileSync("timestamps.json", JSON.stringify(timestamps, null, 2));
  console.log("📁 timestamps.json updated!");
}

main().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
