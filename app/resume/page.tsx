import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "app/utils/jsonLd";
import WorkExperienceItem from "../components/work-experience-item";
import EducationItem from "../components/education-item";
import Chip from "../components/chip";
import { config } from "../config/config";

export const metadata: Metadata = {
	metadataBase: new URL("https://indrajitsahani.com"),
	title: "Resume",
	description:
		"Indrajit Sahani's resume: Full-Stack Developer owning Sendkit end to end at Enrich Labs. Experienced in TypeScript, Node.js, Go, MongoDB, Redis, Docker & OpenTelemetry.",
	keywords: [
		"Indrajit Sahani Resume",
		"Full Stack Developer Resume",
		"Web Developer CV",
		"React Developer Resume",
		"Software Engineer Resume",
		"Work Experience",
		"TypeScript Developer Resume",
	],
	alternates: {
		canonical: "/resume",
	},
	openGraph: {
		type: "article",
		url: "https://indrajitsahani.com/resume",
		title: "Resume - Full-Stack Developer Experience | Indrajit Sahani",
		siteName: "Indrajit Sahani's Portfolio",
		description:
			"Full-Stack Developer owning Sendkit end to end at Enrich Labs. Experienced in TypeScript, Node.js, Go, MongoDB, Redis, Docker & OpenTelemetry.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Resume - Full-Stack Developer Experience | Indrajit Sahani",
		description:
			"Full-Stack Developer owning Sendkit end to end at Enrich Labs. Experienced in TypeScript, Node.js, Go, MongoDB, Redis, Docker & OpenTelemetry.",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
	},
};

const toolkit = [
	{
		area: "Frontend",
		tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN", "Recoil", "React-Konva"],
	},
	{
		area: "Backend",
		tools: ["Node.js", "Go", "Hono", "Express", "REST APIs", "WebSocket"],
	},
	{
		area: "Data & Infra",
		tools: ["MongoDB", "PostgreSQL", "Prisma", "Redis", "Docker", "Linux", "Hetzner", "DigitalOcean", "Dokploy", "Vercel"],
	},
	{
		area: "Observability",
		tools: ["OpenTelemetry", "Grafana", "SigNoz"],
	},
	{
		area: "AI & Automation",
		tools: ["MCP", "AI Agents", "Langchain", "Pinecone", "Hugging Face", "RAG pipelines", "Playwright"],
	},
];

const resumeData = {
	workExperience: [
		{
			company: "Enrich Labs (Sendkit)",
			logo: "https://www.google.com/s2/favicons?domain=sendkit.ai&sz=128",
			location: "Remote",
			website: config.companies.sendkit,
			positions: [
				{
					role: "Full-Stack Developer",
					period: "Oct 2025 - Present",
					workType: "Full-time",
					technologies: [
						"TypeScript",
						"Next.js",
						"Node.js",
						"MongoDB",
						"Redis",
						"Docker",
						"OpenTelemetry",
					],
					responsibilities: [
						"Own Sendkit, a cold email platform for agencies and GTM teams, end to end: engineering across product, backend, and infrastructure, plus coordinating with the team on how features and systems should work.",
						"Built monitoring and observability across all production servers and services.",
						"Shipped the Sendkit CLI and MCP integrations, letting users and AI agents manage campaigns, mailboxes, and leads directly.",
						"Drive email deliverability work: diagnosing bounces, mail provider blocks, and sender reputation issues.",
						"Lead scalability and performance work as usage grows, including infrastructure moves and code optimisation.",
						"Built integrations with users' existing tools and migration modules that let customers move over from other sequencers with almost no friction.",
						"Turn customer feedback into product improvements and work directly with customers to debug issues.",
					],
				},
			],
		},
		{
			company: "Linkbird",
			logo: "https://www.google.com/s2/favicons?domain=linkbird.ai&sz=128",
			location: "Remote",
			website: config.companies.linkbird,
			positions: [
				{
					role: "Full-Stack Developer",
					period: "2025",
					workType: "Full-time",
					technologies: [
						"TypeScript",
						"Next.js",
						"Node.js",
						"PostgreSQL",
						"Redis",
						"Docker",
					],
					responsibilities: [
						"Led the build from nothing to a working product, on my own and fully remote.",
						"Built the outreach automation engine that runs LinkedIn campaigns at scale: bulk connection requests, personalized messaging, and automated follow-up sequences.",
						"Built browser automation that keeps each account's session and identity consistent, so accounts run safely under sustained, high-volume use.",
						"Designed the product around how GTM agencies actually operate, managing many accounts and campaigns from a single place.",
					],
				},
			],
		},
	],
	education: [
		{
			institution: "Guru Gobind Singh Indraprastha University (IPU)",
			logo: "https://www.google.com/s2/favicons?domain=ipu.ac.in&sz=128",
			degree: "Bachelor of Technology (B.Tech), Information Technology",
			period: "2023 - 2027",
			location: "Delhi, India",
		},
	],
};

export default function WorkPage() {
	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: "https://indrajitsahani.com" },
		{ name: "Resume", url: "https://indrajitsahani.com/resume" },
	]);

	const profileJsonLd = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		mainEntity: {
			"@type": "Person",
			name: "Indrajit Sahani",
			url: "https://indrajitsahani.com",
			jobTitle: "Full-Stack Developer",
			worksFor: [
				{
					"@type": "Organization",
					name: "Enrich Labs",
					url: config.companies.enrichLabs,
				},
			],
			alumniOf: [
				{
					"@type": "EducationalOrganization",
					name: "Guru Gobind Singh Indraprastha University",
				},
			],
			knowsAbout: [
				"React",
				"Next.js",
				"TypeScript",
				"Node.js",
				"Go",
				"PostgreSQL",
				"Redis",
				"Docker",
				"OpenTelemetry",
				"Observability",
				"Email Deliverability",
			],
		},
	};

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbJsonLd),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(profileJsonLd),
				}}
			/>
			<div className="flex">
				<h1 className='font-medium text-2xl mb-2 tracking-tight font-["monospace"]'>
					My Resume 📝
				</h1>
			</div>
			<p className="sr-only">
				Professional resume of Indrajit Sahani, a product-minded Full-Stack Developer. Owns Sendkit, a cold email platform, end to end at Enrich Labs, across product engineering, infrastructure, observability, email deliverability, and AI integrations. Previously built Linkbird, a LinkedIn automation platform, from the ground up. Experienced in React, Next.js, TypeScript, Node.js, Go, MongoDB, PostgreSQL, Redis, Docker, and OpenTelemetry. Pursuing a B.Tech in Information Technology from Guru Gobind Singh Indraprastha University, Delhi.
			</p>

			{/* Traditional PDF résumé */}
			<div className="not-prose no-print mb-8 flex flex-col gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					Prefer a traditional one-page résumé? View or download the PDF version.
				</p>
				<a
					href={config.resume.drive}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
				>
					View résumé PDF →
				</a>
			</div>

			{/* Work Section */}
			<div className="prose prose-neutral dark:prose-invert">
				<h2 className="font-medium text-2xl mb-4">Work Experience</h2>
				{resumeData.workExperience.map((job, index) => (
					<WorkExperienceItem key={index} job={job} />
				))}
			</div>

			<hr className="my-6 border-neutral-100 dark:border-neutral-800" />

			{/* Technical Toolkit Section */}
			<div className="prose prose-neutral dark:prose-invert">
				<h2 className="font-medium text-2xl mb-4">Technical Toolkit</h2>
				<div className="not-prose space-y-4">
					{toolkit.map(group => (
						<div key={group.area}>
							<p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-2">
								{group.area}
							</p>
							<div className="flex gap-2 flex-wrap">
								{group.tools.map(tool => (
									<Chip key={tool} tech={tool} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className="my-6 border-neutral-100 dark:border-neutral-800" />

			{/* Education Section */}
			<div className="prose prose-neutral dark:prose-invert">
				<h2 className="font-medium text-2xl mb-4">Education</h2>
				{resumeData.education.map((edu, index) => (
					<EducationItem key={index} edu={edu} />
				))}
			</div>
		</section>
	);
}
