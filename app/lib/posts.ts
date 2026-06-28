import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { highlight } from "sugar-high";

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

// Highlight fenced code blocks with sugar-high, which emits spans that read the
// --sh-* CSS variables already defined in global.css. Works with marked's old
// (string) and new (token object) renderer signatures.
marked.use({
	renderer: {
		code(token: unknown) {
			const code =
				typeof token === "string" ? token : (token as { text: string }).text;
			try {
				return `<pre><code>${highlight(code)}</code></pre>`;
			} catch {
				return `<pre><code>${escapeHtml(code)}</code></pre>`;
			}
		},
	},
});

// Posts live as Markdown files in content/blog — author them here directly, or
// paste in the Markdown of a post you wrote on Hashnode. Rendering from the
// repo means no runtime fetch, no API token, and no bot-challenge; the blog is
// fully on-domain and free.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type BlogTag = {
	name: string;
	slug: string;
};

export type BlogPostSummary = {
	id: string;
	title: string;
	brief: string;
	slug: string;
	publishedAt: string;
	updatedAt: string | null;
	readTimeInMinutes: number | null;
	coverImage: string | null;
	tags: BlogTag[];
};

export type BlogPost = BlogPostSummary & {
	contentHtml: string;
	seoTitle: string | null;
	seoDescription: string | null;
	ogImage: string | null;
	authorName: string | null;
	originalUrl: string | null;
};

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function toIso(value: unknown): string | null {
	if (!value) return null;
	const date = new Date(value as string);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

// Frontmatter shapes vary (hand-authored vs. Hashnode's backup), so accept a
// few common aliases for each field.
function firstString(...values: unknown[]): string | null {
	for (const value of values) {
		if (typeof value === "string" && value.trim()) return value.trim();
	}
	return null;
}

function normalizeTags(value: unknown): BlogTag[] {
	let list: string[] = [];
	if (Array.isArray(value)) {
		list = value.map((item) => String(item));
	} else if (typeof value === "string") {
		list = value.split(",");
	}
	return list
		.map((name) => name.trim())
		.filter(Boolean)
		.map((name) => ({ name, slug: slugify(name) }));
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function estimateReadTime(text: string): number {
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

// Give h2–h4 stable ids and a hover "#" anchor (styled via .prose .anchor in
// global.css) so readers can deep-link to sections.
function addHeadingAnchors(html: string): string {
	return html.replace(/<(h[2-4])>([\s\S]*?)<\/\1>/g, (_match, tag, inner) => {
		const id = slugify(stripHtml(inner));
		if (!id) return `<${tag}>${inner}</${tag}>`;
		return `<${tag} id="${id}"><a href="#${id}" class="anchor" aria-hidden="true"></a>${inner}</${tag}>`;
	});
}

// Hashnode wraps image URLs in its Next.js optimizer
// (https://<host>/_next/image?url=<encoded>&w=..&q=..). That endpoint sits on
// the bot-challenged hashnode.dev domain, so unwrap it to the direct CDN URL.
function unwrapNextImage(url: string): string {
	const match = url.match(/\/_next\/image\?url=([^&]+)/);
	if (!match) return url;
	try {
		return decodeURIComponent(match[1]);
	} catch {
		return url;
	}
}

// Normalize Hashnode-flavored image Markdown: strip the non-standard
// ` align="..."` suffix Hashnode adds inside the parentheses, and unwrap
// optimizer URLs. Without this, marked treats ` align="left"` as part of the
// src and the image fails to load.
function normalizeImages(markdown: string): string {
	return markdown.replace(
		/!\[([^\]]*)\]\(([^)]+)\)/g,
		(_match, alt, destination) => {
			let url = destination.trim().replace(/\s+align=(["']).*?\1\s*$/i, "");
			url = unwrapNextImage(url.trim());
			return `![${alt}](${url})`;
		},
	);
}

function renderMarkdown(markdown: string): string {
	const html = marked.parse(normalizeImages(markdown), {
		async: false,
	}) as string;
	return addHeadingAnchors(html);
}

function parseFile(fileName: string): BlogPost | null {
	const filePath = path.join(POSTS_DIR, fileName);
	const raw = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(raw);

	// Skip drafts explicitly marked as such.
	if (data.draft === true || data.published === false) return null;

	const slug = firstString(data.slug) ?? fileName.replace(/\.mdx?$/, "");
	const title = firstString(data.title) ?? slug;

	const contentHtml = renderMarkdown(content);
	const plainText = stripHtml(contentHtml);

	const brief =
		firstString(data.excerpt, data.seoDescription, data.subtitle, data.brief) ??
		plainText.slice(0, 200);

	const rawCover = firstString(
		data.cover,
		data.coverImage,
		data.ogImage,
		data.image,
	);
	const coverImage = rawCover ? unwrapNextImage(rawCover) : null;

	// Fall back to the file's modified time so a post without an explicit date
	// still sorts and displays sensibly.
	const publishedAt =
		toIso(data.date ?? data.datePublished ?? data.publishedAt) ??
		fs.statSync(filePath).mtime.toISOString();
	const updatedAt = toIso(data.updated ?? data.dateUpdated ?? data.updatedAt);

	return {
		id: firstString(data.cuid, data.id) ?? slug,
		title,
		brief,
		slug,
		publishedAt,
		updatedAt,
		readTimeInMinutes: estimateReadTime(plainText),
		coverImage,
		tags: normalizeTags(data.tags),
		contentHtml,
		seoTitle: firstString(data.seoTitle),
		seoDescription: firstString(data.seoDescription) ?? brief,
		ogImage: coverImage,
		authorName: firstString(data.author, data.authorName),
		originalUrl: firstString(
			data.canonical,
			data.canonicalUrl,
			data.originalUrl,
		),
	};
}

function readAll(): BlogPost[] {
	if (!fs.existsSync(POSTS_DIR)) return [];
	return fs
		.readdirSync(POSTS_DIR)
		.filter((file) => /\.mdx?$/.test(file))
		.map(parseFile)
		.filter((post): post is BlogPost => post !== null)
		.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function toSummary(post: BlogPost): BlogPostSummary {
	return {
		id: post.id,
		title: post.title,
		brief: post.brief,
		slug: post.slug,
		publishedAt: post.publishedAt,
		updatedAt: post.updatedAt,
		readTimeInMinutes: post.readTimeInMinutes,
		coverImage: post.coverImage,
		tags: post.tags,
	};
}

export function getBlogPosts(first = 50): BlogPostSummary[] {
	return readAll().slice(0, first).map(toSummary);
}

export function getBlogPost(slug: string): BlogPost | null {
	return readAll().find((post) => post.slug === slug) ?? null;
}
