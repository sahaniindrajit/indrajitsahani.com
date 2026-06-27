import { generateBreadcrumbJsonLd } from "app/utils/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import Separator from "../components/separator";
import { getBlogPosts } from "../lib/hashnode";
import formatDate from "../utils/formatDate";

const SITE_URL = "https://indrajitsahani.com";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: "Blog",
	description:
		"Writing by Indrajit Sahani on full-stack development, React, Next.js, TypeScript, Node.js, Go, and building real products that ship.",
	keywords: [
		"Indrajit Sahani Blog",
		"Full Stack Developer Blog",
		"React Blog",
		"Next.js Blog",
		"TypeScript",
		"Node.js",
		"Go",
		"Web Development Articles",
	],
	alternates: {
		canonical: "/blog",
		types: {
			"application/rss+xml": `${SITE_URL}/feed.xml`,
		},
	},
	openGraph: {
		title: "Blog | Indrajit Sahani",
		description:
			"Writing on full-stack development, React, Next.js, TypeScript, Node.js, Go, and building real products that ship.",
		url: `${SITE_URL}/blog`,
		siteName: "Indrajit Sahani's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog | Indrajit Sahani",
		description:
			"Writing on full-stack development, React, Next.js, TypeScript, Node.js, Go, and building real products that ship.",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
	},
};

// Revalidate the list page hourly so newly published Hashnode posts appear.
export const revalidate = 3600;

export default async function BlogPage() {
	const posts = await getBlogPosts();

	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: SITE_URL },
		{ name: "Blog", url: `${SITE_URL}/blog` },
	]);

	const blogJsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Indrajit Sahani's Blog",
		url: `${SITE_URL}/blog`,
		author: {
			"@type": "Person",
			name: "Indrajit Sahani",
			url: SITE_URL,
		},
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			url: `${SITE_URL}/blog/${post.slug}`,
			datePublished: post.publishedAt,
			dateModified: post.updatedAt ?? post.publishedAt,
		})),
	};

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
			/>
			<h1 className='font-medium text-2xl mb-4 tracking-tight font-["monospace"]'>
				Blog ✍️
			</h1>
			<p className="sr-only">
				Articles by Indrajit Sahani, a product-minded full-stack developer,
				covering React, Next.js, TypeScript, Node.js, Go, system design, and
				lessons from shipping real products.
			</p>
			<p className="prose prose-neutral dark:prose-invert mb-2">
				Notes on building full-stack products — React, Next.js, TypeScript,
				Node.js, Go, and the messy parts in between.
			</p>

			<Separator />

			{posts.length === 0 ? (
				<p className="mt-6 text-neutral-600 dark:text-neutral-400">
					No posts yet. Check back soon, or read along on{" "}
					<a
						href="https://sahaniindrajit.hashnode.dev/"
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						Hashnode
					</a>
					.
				</p>
			) : (
				<ul className="mt-6 flex flex-col gap-6">
					{posts.map((post) => (
						<li key={post.id}>
							<Link
								href={`/blog/${post.slug}`}
								className="group block no-underline"
							>
								<h2 className="text-lg font-medium tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
									{post.title}
								</h2>
								<div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
									<time dateTime={post.publishedAt}>
										{formatDate(post.publishedAt)}
									</time>
									{post.readTimeInMinutes ? (
										<>
											<span aria-hidden>·</span>
											<span>{post.readTimeInMinutes} min read</span>
										</>
									) : null}
								</div>
								<p className="mt-2 text-neutral-600 dark:text-neutral-400 line-clamp-2">
									{post.brief}
								</p>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
