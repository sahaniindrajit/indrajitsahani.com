import { getBlogPosts } from "./lib/posts";

const baseUrl = "https://indrajitsahani.com";

export default async function sitemap() {
	const staticRoutes = [
		{
			url: baseUrl,
			lastModified: new Date().toISOString(),
			changeFrequency: "weekly" as const,
			priority: 1.0,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date().toISOString(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/resume`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date().toISOString(),
			changeFrequency: "yearly" as const,
			priority: 0.5,
		},
	];

	// Pull published blog posts so each gets its own indexable sitemap entry.
	const posts = await getBlogPosts();
	const blogRoutes = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes];
}
