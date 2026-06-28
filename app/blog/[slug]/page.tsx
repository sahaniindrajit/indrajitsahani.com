import { generateBreadcrumbJsonLd } from "app/utils/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Separator from "../../components/separator";
import { getBlogPost, getBlogPosts } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

const SITE_URL = "https://indrajitsahani.com";

// Posts are local Markdown, so every slug is known at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
	const posts = await getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		return { title: "Post not found" };
	}

	const title = post.seoTitle ?? post.title;
	const description = post.seoDescription ?? post.brief;
	const url = `${SITE_URL}/blog/${post.slug}`;
	const image = post.ogImage ?? post.coverImage ?? undefined;

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		// Self-canonical: claim authority for this domain. (Also set the
		// canonical URL on the Hashnode post to point here to consolidate.)
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			title,
			description,
			url,
			siteName: "Indrajit Sahani's Portfolio",
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt ?? post.publishedAt,
			authors: [post.authorName ?? "Indrajit Sahani"],
			images: image ? [{ url: image }] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			creator: "@sahani_indrajit",
			site: "@sahani_indrajit",
			images: image ? [image] : undefined,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	const url = `${SITE_URL}/blog/${post.slug}`;
	const image = post.ogImage ?? post.coverImage ?? `${SITE_URL}/indrajit.png`;

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.brief,
		image,
		url,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt ?? post.publishedAt,
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
		author: {
			"@type": "Person",
			name: post.authorName ?? "Indrajit Sahani",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Person",
			name: "Indrajit Sahani",
			url: SITE_URL,
		},
		keywords: post.tags.map((tag) => tag.name).join(", "),
	};

	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: SITE_URL },
		{ name: "Blog", url: `${SITE_URL}/blog` },
		{ name: post.title, url },
	]);

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			<Link
				href="/blog"
				className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors no-underline"
			>
				← Back to blog
			</Link>

			<h1 className="mt-4 font-medium text-2xl tracking-tight">{post.title}</h1>

			<div className="mt-2 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
				<time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
				{post.readTimeInMinutes ? (
					<>
						<span aria-hidden>·</span>
						<span>{post.readTimeInMinutes} min read</span>
					</>
				) : null}
			</div>

			{post.tags.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag.slug}
							className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
						>
							{tag.name}
						</span>
					))}
				</div>
			)}

			<Separator />

			<article
				className="prose prose-neutral dark:prose-invert max-w-none mt-6"
				// Content is authored by the site owner (Markdown in content/blog,
				// rendered to HTML at build time), so it is trusted.
				dangerouslySetInnerHTML={{ __html: post.contentHtml }}
			/>

			{post.originalUrl && (
				<>
					<Separator />
					<p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
						Originally published on{" "}
						<a
							href={post.originalUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							Hashnode
						</a>
						.
					</p>
				</>
			)}
		</section>
	);
}
