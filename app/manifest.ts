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
				src: "/icon",
				sizes: "64x64",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/apple-icon",
				sizes: "180x180",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}
