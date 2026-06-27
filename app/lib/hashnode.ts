import { config } from "../config/config";

// Public Hashnode GraphQL endpoint. No auth required for reading published
// posts of a public publication.
const HASHNODE_GQL = "https://gql.hashnode.com";

// How long (in seconds) Next.js may serve cached Hashnode data before
// revalidating in the background. One hour keeps the blog fresh without
// hammering the API on every request.
const REVALIDATE_SECONDS = 60 * 60;

export type BlogTag = {
	name: string;
	slug: string;
};

export type BlogPostSummary = {
	id: string;
	title: string;
	brief: string;
	slug: string;
	url: string;
	publishedAt: string;
	updatedAt: string | null;
	readTimeInMinutes: number | null;
	coverImage: string | null;
	tags: BlogTag[];
};

export type BlogPost = BlogPostSummary & {
	contentHtml: string;
	seoTitle: string | null;
	seoDescription: string | null;
	ogImage: string | null;
	authorName: string | null;
};

type GraphQLResponse<T> = {
	data?: T;
	errors?: Array<{ message: string }>;
};

async function hashnodeFetch<T>(
	query: string,
	variables: Record<string, unknown>,
): Promise<T | null> {
	try {
		const res = await fetch(HASHNODE_GQL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query, variables }),
			next: { revalidate: REVALIDATE_SECONDS, tags: ["hashnode"] },
		});

		if (!res.ok) {
			console.error(`Hashnode API responded with ${res.status}`);
			return null;
		}

		const json = (await res.json()) as GraphQLResponse<T>;
		if (json.errors?.length) {
			console.error("Hashnode API errors:", json.errors);
			return null;
		}
		return json.data ?? null;
	} catch (err) {
		// Never let a transient Hashnode outage break the build or a render.
		console.error("Hashnode API request failed:", err);
		return null;
	}
}

const POSTS_QUERY = /* GraphQL */ `
	query Posts($host: String!, $first: Int!) {
		publication(host: $host) {
			posts(first: $first) {
				edges {
					node {
						id
						title
						brief
						slug
						url
						publishedAt
						updatedAt
						readTimeInMinutes
						coverImage {
							url
						}
						tags {
							name
							slug
						}
					}
				}
			}
		}
	}
`;

const POST_QUERY = /* GraphQL */ `
	query Post($host: String!, $slug: String!) {
		publication(host: $host) {
			post(slug: $slug) {
				id
				title
				brief
				slug
				url
				publishedAt
				updatedAt
				readTimeInMinutes
				coverImage {
					url
				}
				tags {
					name
					slug
				}
				content {
					html
				}
				seo {
					title
					description
				}
				ogMetaData {
					image
				}
				author {
					name
				}
			}
		}
	}
`;

type RawPostNode = {
	id: string;
	title: string;
	brief: string;
	slug: string;
	url: string;
	publishedAt: string;
	updatedAt: string | null;
	readTimeInMinutes: number | null;
	coverImage: { url: string } | null;
	tags: BlogTag[] | null;
};

function toSummary(node: RawPostNode): BlogPostSummary {
	return {
		id: node.id,
		title: node.title,
		brief: node.brief,
		slug: node.slug,
		url: node.url,
		publishedAt: node.publishedAt,
		updatedAt: node.updatedAt,
		readTimeInMinutes: node.readTimeInMinutes,
		coverImage: node.coverImage?.url ?? null,
		tags: node.tags ?? [],
	};
}

export async function getBlogPosts(first = 50): Promise<BlogPostSummary[]> {
	const data = await hashnodeFetch<{
		publication: { posts: { edges: Array<{ node: RawPostNode }> } } | null;
	}>(POSTS_QUERY, { host: config.blog.hashnodeHost, first });

	const edges = data?.publication?.posts?.edges ?? [];
	return edges.map((edge) => toSummary(edge.node));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	const data = await hashnodeFetch<{
		publication: {
			post:
				| (RawPostNode & {
						content: { html: string } | null;
						seo: { title: string | null; description: string | null } | null;
						ogMetaData: { image: string | null } | null;
						author: { name: string | null } | null;
					})
				| null;
		} | null;
	}>(POST_QUERY, { host: config.blog.hashnodeHost, slug });

	const post = data?.publication?.post;
	if (!post) return null;

	return {
		...toSummary(post),
		contentHtml: post.content?.html ?? "",
		seoTitle: post.seo?.title ?? null,
		seoDescription: post.seo?.description ?? null,
		ogImage: post.ogMetaData?.image ?? null,
		authorName: post.author?.name ?? null,
	};
}
