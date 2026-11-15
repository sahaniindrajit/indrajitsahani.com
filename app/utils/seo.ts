// Shared SEO helpers.

// The site-wide share image (app/opengraph-image.tsx). Pages that define their
// own `openGraph`/`twitter` metadata replace the parent's, so they must list
// the image again or link previews show no picture.
export const defaultOgImage = {
	url: "/opengraph-image",
	width: 1200,
	height: 630,
	alt: "Indrajit Sahani - Full-Stack Developer",
};

// Only the production deployment should be indexed. Vercel sets VERCEL_ENV to
// "preview" or "development" for other deployments; self-hosted builds have no
// VERCEL_ENV and count as production.
export const isProductionDeployment =
	!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
