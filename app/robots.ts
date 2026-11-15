import { isProductionDeployment } from "./utils/seo";

export default function robots() {
	// Block all crawling on dev/preview deployments.
	if (!isProductionDeployment) {
		return {
			rules: [{ userAgent: "*", disallow: "/" }],
		};
	}

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
