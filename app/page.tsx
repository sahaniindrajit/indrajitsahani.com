import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import ArrowIcon from "./components/ArrowIcon";
import Badge from "./components/Badge";
import Separator from "./components/separator";
import { config } from "./config/config";

export const metadata: Metadata = {
	metadataBase: new URL("https://indrajitsahani.com"),
	title: "Indrajit Sahani - Full-Stack Developer",
	description:
		"Indrajit Sahani is a product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
	keywords: [
		"Indrajit Sahani",
		"Full Stack Developer",
		"Web Developer",
		"React Developer",
		"Next.js Developer",
		"TypeScript Developer",
		"Node.js Developer",
		"Go Developer",
		"Software Engineer",
		"Sendkit",
		"Enrich Labs",
		"Remote Developer",
		"Portfolio",
	],
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Indrajit Sahani - Full-Stack Developer",
		description:
			"Product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
		url: "https://indrajitsahani.com",
		siteName: "Indrajit Sahani's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Indrajit Sahani - Full-Stack Developer",
		description:
			"Product-minded full-stack developer specializing in React, Next.js, TypeScript, Node.js & Go. Currently building Sendkit at Enrich Labs.",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
	},
};

export default function Page() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Indrajit Sahani",
		url: "https://indrajitsahani.com",
		image: "https://indrajitsahani.com/indrajit.png",
		jobTitle: "Full-Stack Developer",
		email: `mailto:${config.socials.email}`,
		nationality: "Indian",
		worksFor: [
			{
				"@type": "Organization",
				name: "Enrich Labs",
				url: config.companies.enrichLabs,
			},
		],
		hasOccupation: {
			"@type": "Occupation",
			name: "Full-Stack Developer",
			skills:
				"React, Next.js, TypeScript, Node.js, Go, PostgreSQL, Redis, Web Development",
		},
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: "Guru Gobind Singh Indraprastha University",
			url: config.education.ipu,
		},
		sameAs: [
			config.socials.github,
			config.socials.twitter,
			config.socials.linkedin,
			config.socials.blog,
		],
		knowsAbout: [
			"Full Stack Development",
			"React",
			"Next.js",
			"TypeScript",
			"Node.js",
			"Go",
			"PostgreSQL",
			"Redis",
			"Web Development",
		],
		address: {
			"@type": "PostalAddress",
			addressCountry: "India",
		},
	};

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<p className="sr-only">
				Indrajit Sahani is a product-minded full-stack developer who builds real
				products teams depend on. He specializes in React, Next.js, TypeScript,
				Node.js, Go, PostgreSQL, and Redis. Currently building Sendkit, a cold
				email platform, at Enrich Labs, and previously built Linkbird, a
				LinkedIn automation platform. He is open to remote roles, freelance
				work, and collaborations.
			</p>
			<header className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Image
						src="/indrajit.png"
						alt="Indrajit Sahani"
						width={72}
						height={72}
						priority
						className="rounded-full"
					/>
					<div>
						<div className="flex items-center gap-3 flex-wrap">
							<h1 className='font-medium text-2xl tracking-tight font-["monospace"]'>
								Hey, I'm Indrajit Sahani 👋
							</h1>
						</div>
						{config.profile.availableForFreelance && (
							<span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-full">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
								</span>
								Open to roles & freelance
							</span>
						)}
					</div>
				</div>
				<p className="text-lg prose prose-neutral dark:prose-invert">
					I'm a full-stack developer with a product mindset, building real
					products that teams depend on and taking them from idea to launch.
				</p>
			</header>

			<Separator />

			<div className="mb-8 prose prose-neutral dark:prose-invert">
				<h2>What I'm Building Now</h2>
				<p>
					I'm currently a <strong>Full-Stack Developer</strong> at{" "}
					<span className="not-prose">
						<Badge href={config.companies.sendkit}>
							<Image
								src="https://www.google.com/s2/favicons?domain=sendkit.ai&sz=128"
								alt="Sendkit"
								height={16}
								width={16}
								className="pr-1"
								unoptimized
							/>
							Enrich Labs
						</Badge>
					</span>
					, where I'm building <strong>Sendkit</strong>, a cold email platform
					for agencies and GTM teams. I build the integrations that let users
					connect their existing tools, the migration modules that make
					switching platforms painless, and turn customer feedback directly into
					product improvements.
				</p>
				<p>
					Before this, I led the build of{" "}
					<span className="not-prose">
						<Badge href={config.companies.linkbird}>
							<Image
								src="https://www.google.com/s2/favicons?domain=linkbird.ai&sz=128"
								alt="Linkbird"
								height={16}
								width={16}
								className="pr-1"
								unoptimized
							/>
							Linkbird
						</Badge>
					</span>{" "}
					from nothing to a working product, fully remote and on my own. It's a
					LinkedIn automation platform for mass outreach built for GTM agencies.
					For more details, check out my <Link href="/resume">resume</Link>.
				</p>
			</div>

			<Separator />

			<div className="mb-8 prose prose-neutral dark:prose-invert">
				<h2>How I Work</h2>
				<p>
					I care about <em>why</em> something gets built and whether it actually
					helps the people using it, not just whether the code runs. I've
					shipped real products that teams depend on, taking them from idea to
					launch and sharpening them based on how people actually use them.
				</p>
				<p>
					I do my best work in small, fast-moving teams where I can own what I
					build. I treat side projects like products too: each one solves a real
					problem and actually ships.
				</p>
			</div>

			<Separator />

			<div className="mb-8 prose prose-neutral dark:prose-invert">
				<h2>GitHub Contributions</h2>
				<p className="sr-only">
					Indrajit Sahani's GitHub contribution graph showing daily open-source
					coding activity on React, Next.js, TypeScript, Node.js, and Go
					projects as sahaniindrajit.
				</p>
				<GitHubCalendar username="sahaniindrajit" />
			</div>

			<div className="prose prose-neutral dark:prose-invert">
				<article className="text-xs sm:hidden lg:block">
					Press ⌘+K to navigate with your keyboard.
				</article>
			</div>

			<nav aria-label="Quick links to connect with Indrajit Sahani">
				<h2 className="sr-only">Get in Touch</h2>
				<ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
					<li>
						<a
							className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
							rel="noopener noreferrer"
							target="_blank"
							href={config.socials.twitter}
						>
							<ArrowIcon />
							<p className="h-7 ml-2">Follow me on X</p>
						</a>
					</li>
					<li>
						<a
							className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
							rel="noopener noreferrer"
							target="_blank"
							href={config.socials.blog}
						>
							<ArrowIcon />
							<p className="h-7 ml-2">Read my blog</p>
						</a>
					</li>
				</ul>

				<div>
					<a
						className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all text-neutral-600 dark:text-neutral-300 mt-3"
						rel="noopener noreferrer"
						target="_blank"
						href={`mailto:${config.socials.email}?subject=Hello Indrajit!`}
					>
						<p className="h-7">
							<span className="mr-2 text-neutral-600">📧</span>
							{config.socials.email}
						</p>
						<span className="sr-only">
							Send an email to Indrajit Sahani for freelance inquiries or
							collaboration
						</span>
					</a>
				</div>
			</nav>
		</section>
	);
}
