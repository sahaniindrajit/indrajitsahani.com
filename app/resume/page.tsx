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
		"Indrajit Sahani's resume: Full-Stack Developer building Sendkit at Enrich Labs. Experienced in React, Next.js, TypeScript, Node.js, Go & PostgreSQL.",
	keywords: [
		"Indrajit Sahani Resume",
		"Full Stack Developer Resume",
		"Web Developer CV",
		"React Developer Resume",
		"Software Engineer Resume",
		"Work Experience",
		"Hire Developer",
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
			"Full-Stack Developer building Sendkit at Enrich Labs. Experienced in React, Next.js, TypeScript, Node.js, Go & PostgreSQL.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Resume - Full-Stack Developer Experience | Indrajit Sahani",
		description:
			"Full-Stack Developer building Sendkit at Enrich Labs. Experienced in React, Next.js, TypeScript, Node.js, Go & PostgreSQL.",
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
		tools: ["Node.js", "Hono", "Express", "REST APIs", "WebSocket", "Go"],
	},
	{
		area: "Data & Infra",
		tools: ["MongoDB", "PostgreSQL", "Prisma", "Redis", "Docker", "Hetzner", "Dokploy", "Vercel"],
	},
	{
		area: "AI / ML",
		tools: ["Langchain", "Pinecone", "Hugging Face", "RAG pipelines"],
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
						"Hono",
						"PostgreSQL",
						"Prisma",
						"Redis",
					],
					responsibilities: [
						"Building Sendkit, a cold email platform for agencies and GTM teams.",
						"Built integrations that let users connect their existing tools and work across them seamlessly inside Sendkit, instead of stitching together disconnected apps.",
						"Built migration modules so customers can bring their data over from other sequencers with almost no friction, removing one of the biggest reasons teams hesitate to switch platforms.",
						"Turn customer feedback into concrete product improvements, and work directly with customers to debug issues and guide them through the problems they run into.",
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
			period: "2022 - 2026",
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
				Professional resume of Indrajit Sahani, a product-minded Full-Stack Developer. Currently building Sendkit, a cold email platform, at Enrich Labs. Previously built Linkbird, a LinkedIn automation platform, from the ground up. Experienced in React, Next.js, TypeScript, Node.js, Go, PostgreSQL, Redis, and Docker. Holds a B.Tech in Information Technology from Guru Gobind Singh Indraprastha University, Delhi.
			</p>

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
