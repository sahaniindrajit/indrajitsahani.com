import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Indrajit Sahani",
		short_name: "indrajitsahani",
		description:
			"Product-minded full-stack developer. Building real products that teams depend on.",
		start_url: "/",
		id: "com.indrajitsahani",
		display: "standalone",
		// Match the site's default (light) chrome so the installed PWA's
		// surfaces don't flash a mismatched black bar against the white UI.
		background_color: "#ffffff",
		theme_color: "#ffffff",
		icons: [
			{
				src: "/logo.png",
				sizes: "any",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}
