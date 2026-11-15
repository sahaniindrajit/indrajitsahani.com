import "./global.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";

import Cmdk from "./components/CmdK";
import Footer from "./components/footer";
import { PreloadResources } from "./preload";
import {
	defaultOgImage,
	enrichLabsOrg,
	isProductionDeployment,
} from "./utils/seo";

export const metadata: Metadata = {
	metadataBase: new URL("https://indrajitsahani.com"),
	title: {
		default: "Indrajit Sahani - Full-Stack Developer at Sendkit (Enrich Labs)",
		template: "%s | Indrajit Sahani",
	},
	description:
		"Indrajit Sahani is a product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
	alternates: {
		types: {
			"application/rss+xml": "https://indrajitsahani.com/feed.xml",
		},
	},
	// Set GOOGLE_SITE_VERIFICATION in the environment to verify the domain in
	// Google Search Console (renders <meta name="google-site-verification">).
	verification: process.env.GOOGLE_SITE_VERIFICATION
		? { google: process.env.GOOGLE_SITE_VERIFICATION }
		: undefined,
	openGraph: {
		images: [defaultOgImage],
		title: "Indrajit Sahani - Full-Stack Developer at Sendkit (Enrich Labs)",
		description:
			"Product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
		url: "https://indrajitsahani.com",
		siteName: "Indrajit Sahani's Portfolio",
		locale: "en_US",
		type: "website",
	},
	// Dev and preview deployments must never be indexed, or Google sees a
	// duplicate copy of the site.
	robots: isProductionDeployment
		? {
				index: true,
				follow: true,
				googleBot: {
					index: true,
					follow: true,
					"max-video-preview": -1,
					"max-image-preview": "large",
					"max-snippet": -1,
				},
			}
		: { index: false, follow: false },
	twitter: {
		images: [defaultOgImage.url],
		title: "Indrajit Sahani - Full-Stack Developer at Sendkit (Enrich Labs)",
		card: "summary_large_image",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
		description:
			"Product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
	},
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cx(
				"text-black bg-white dark:text-white dark:bg-[#111010]",
				GeistSans.variable,
				GeistMono.variable,
			)}
		>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "Indrajit Sahani",
							url: "https://indrajitsahani.com",
							description:
								"Product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go.",
							author: {
								"@type": "Person",
								name: "Indrajit Sahani",
								alternateName: ["Indrajit", "sahaniindrajit"],
								url: "https://indrajitsahani.com",
								jobTitle: "Full-Stack Developer",
								worksFor: enrichLabsOrg,
								sameAs: [
									"https://github.com/sahaniindrajit",
									"https://x.com/sahani_indrajit",
									"https://www.linkedin.com/in/indrajitsahani/",
								],
							},
						}),
					}}
				/>
			</head>
			<body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-auto px-4 mt-8">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black dark:focus:bg-neutral-900 dark:focus:text-white"
				>
					Skip to main content
				</a>
				<main
					id="main-content"
					className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0"
				>
					<Cmdk />
					<Navbar />
					{children}
					<Footer />
					<PreloadResources />
				</main>
			</body>
			{process.env.GOOGLE_ANALYTICS_ID &&
				process.env.NODE_ENV === "production" && (
					<GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
				)}
		</html>
	);
}
