---
title: "Hello, world"
slug: "hello-world"
date: "2026-06-28"
excerpt: "A first post — and a note on how this blog is built: Markdown in the repo, rendered on-domain, no external API."
tags: ["Meta", "Next.js"]
---

This is the first post on the blog. It lives as a Markdown file in
`content/blog/` and is rendered straight from the repository at build time —
no external API, no runtime fetch, no third-party rendering.

## Why it's built this way

Keeping posts on-domain means search engines credit **indrajitsahani.com**
for the content, and the site stays fast and dependency-free. Each post gets
its own page, structured data, Open Graph tags, and a sitemap entry.

## Writing posts

Add a Markdown file to `content/blog/` with frontmatter:

```yaml
---
title: "Your title"
slug: "your-title"
date: "2026-06-28"
excerpt: "One or two sentences for listings and search results."
tags: ["React", "TypeScript"]
---
```

Then write the body in normal Markdown. That's it — commit, deploy, and the
post appears in the list, the RSS feed, and the sitemap automatically.
