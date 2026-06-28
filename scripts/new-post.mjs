#!/usr/bin/env node
// Scaffold a new blog post: `npm run new:post -- "My Post Title"`
// Creates content/blog/<slug>.md with frontmatter ready to fill in.
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new:post -- "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const date = new Date().toISOString().slice(0, 10);
const dir = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(dir, { recursive: true });

const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(
    `A post already exists at ${path.relative(process.cwd(), file)}`,
  );
  process.exit(1);
}

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${date}"
excerpt: ""
tags: []
cover: ""
---

Write your post here in Markdown.
`;

fs.writeFileSync(file, frontmatter);
console.log(`Created ${path.relative(process.cwd(), file)}`);
