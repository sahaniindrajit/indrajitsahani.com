export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				crawlDelay: 0,
			},
		],
		sitemap: "https://indrajitsahani.com/sitemap.xml",
		host: "https://indrajitsahani.com",
	};
}
