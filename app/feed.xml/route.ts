import { getBlogPosts } from "../lib/hashnode";

const SITE_URL = "https://indrajitsahani.com";

// Regenerate the feed at most once an hour.
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export async function GET() {
	const posts = await getBlogPosts();

	const items = posts
		.map((post) => {
			const link = `${SITE_URL}/blog/${post.slug}`;
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			<description>${escapeXml(post.brief)}</description>
			<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
			${post.tags.map((tag) => `<category>${escapeXml(tag.name)}</category>`).join("")}
		</item>`;
		})
		.join("");

	const lastBuildDate =
		posts.length > 0
			? new Date(posts[0].publishedAt).toUTCString()
			: new Date(0).toUTCString();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Indrajit Sahani — Blog</title>
		<link>${SITE_URL}/blog</link>
		<description>Writing on full-stack development, React, Next.js, TypeScript, Node.js, Go, and building real products.</description>
		<language>en</language>
		<lastBuildDate>${lastBuildDate}</lastBuildDate>
		<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}
