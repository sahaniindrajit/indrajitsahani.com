import { config } from "../config/config";

// Hashnode moved its GraphQL API behind paid access in May 2026, so we read
// the publication's free, public RSS feed instead. No auth or token required.
const FEED_URL = `https://${config.blog.hashnodeHost}/rss.xml`;

// How long (in seconds) Next.js may serve cached feed data before revalidating
// in the background. One hour keeps the blog fresh without re-fetching on every
// request.
const REVALIDATE_SECONDS = 60 * 60;

export type BlogTag = {
	name: string;
	slug: string;
};

export type BlogPostSummary = {
	id: string;
	title: string;
	brief: string;
	slug: string;
	url: string;
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
};

// ---------------------------------------------------------------------------
// Tiny RSS parser. Hashnode feeds are standard RSS 2.0 with content:encoded,
// so a focused parser avoids pulling in an XML dependency. It handles CDATA
// sections and the handful of entities that show up in titles/descriptions.
// ---------------------------------------------------------------------------

function decodeEntities(input: string): string {
	return input
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#0?39;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, "&");
}

function firstTag(block: string, name: string): string | null {
	const match = block.match(
		new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`),
	);
	return match ? decodeEntities(match[1]).trim() : null;
}

function allTags(block: string, name: string): string[] {
	const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "g");
	const out: string[] = [];
	let match: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: standard regex loop
	while ((match = re.exec(block)) !== null) {
		out.push(decodeEntities(match[1]).trim());
	}
	return out;
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function slugFromLink(link: string): string {
	try {
		const segments = new URL(link).pathname.split("/").filter(Boolean);
		return segments[segments.length - 1] ?? link;
	} catch {
		return link;
	}
}

function estimateReadTime(text: string): number {
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

function parseItem(block: string): BlogPost | null {
	const title = firstTag(block, "title");
	const link = firstTag(block, "link");
	if (!title || !link) return null;

	const contentHtml =
		firstTag(block, "content:encoded") ?? firstTag(block, "description") ?? "";
	const text = stripHtml(contentHtml);
	const description = firstTag(block, "description");
	const brief = (description ? stripHtml(description) : text).slice(0, 200);

	const pubDate = firstTag(block, "pubDate");
	const publishedAt = pubDate
		? new Date(pubDate).toISOString()
		: new Date(0).toISOString();

	const coverMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
	const coverImage = coverMatch ? coverMatch[1] : null;

	const tags = allTags(block, "category").map((name) => ({
		name,
		slug: slugify(name),
	}));

	const author = firstTag(block, "dc:creator");
	const slug = slugFromLink(link);

	return {
		id: firstTag(block, "guid") ?? link,
		title,
		brief,
		slug,
		url: link,
		publishedAt,
		updatedAt: null,
		readTimeInMinutes: estimateReadTime(text),
		coverImage,
		tags,
		contentHtml,
		seoTitle: null,
		seoDescription: brief,
		ogImage: coverImage,
		authorName: author,
	};
}

async function getFeed(): Promise<BlogPost[]> {
	try {
		const res = await fetch(FEED_URL, {
			headers: { Accept: "application/rss+xml, application/xml, text/xml" },
			next: { revalidate: REVALIDATE_SECONDS, tags: ["hashnode"] },
		});

		if (!res.ok) {
			console.error(`Hashnode RSS responded with ${res.status}`);
			return [];
		}

		const xml = await res.text();
		const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
		return blocks
			.map(parseItem)
			.filter((post): post is BlogPost => post !== null);
	} catch (err) {
		// Never let a transient outage break the build or a render.
		console.error("Hashnode RSS request failed:", err);
		return [];
	}
}

function toSummary(post: BlogPost): BlogPostSummary {
	return {
		id: post.id,
		title: post.title,
		brief: post.brief,
		slug: post.slug,
		url: post.url,
		publishedAt: post.publishedAt,
		updatedAt: post.updatedAt,
		readTimeInMinutes: post.readTimeInMinutes,
		coverImage: post.coverImage,
		tags: post.tags,
	};
}

export async function getBlogPosts(first = 50): Promise<BlogPostSummary[]> {
	const posts = await getFeed();
	return posts.slice(0, first).map(toSummary);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	const posts = await getFeed();
	return posts.find((post) => post.slug === slug) ?? null;
}
