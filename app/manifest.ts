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
		background_color: "#ffffff",
		theme_color: "#000000",
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
