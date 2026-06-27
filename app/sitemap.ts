export default async function sitemap() {
	const baseUrl = "https://indrajitsahani.com";

	const routes = [
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

	return routes;
}
