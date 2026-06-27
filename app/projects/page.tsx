import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "app/utils/jsonLd";
import ProjectCard from "../components/project-card";

export const metadata: Metadata = {
	metadataBase: new URL("https://indrajitsahani.com"),
	title: "Projects",
	description:
		"Projects by Indrajit Sahani: SketchSync, PDF-Talk, Rezumi, and more. Full-stack web apps built with React, Next.js, Node.js, Go & AI.",
	keywords: [
		"Indrajit Sahani Projects",
		"Web Development Projects",
		"React Projects",
		"Next.js Projects",
		"Open Source",
		"Portfolio",
		"Software Projects",
		"Full Stack Projects",
		"TypeScript Projects",
	],
	alternates: {
		canonical: "/projects",
	},
	openGraph: {
		title: "Projects - Full-Stack Web Applications | Indrajit Sahani",
		description:
			"Projects by Indrajit Sahani: SketchSync, PDF-Talk, Rezumi, and more. Full-stack web apps built with React, Next.js, Node.js, Go & AI.",
		url: "https://indrajitsahani.com/projects",
		siteName: "Indrajit Sahani's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects - Full-Stack Web Applications | Indrajit Sahani",
		description:
			"Projects by Indrajit Sahani: SketchSync, PDF-Talk, Rezumi, and more. Full-stack web apps built with React, Next.js, Node.js, Go & AI.",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
	},
};

const projectsData = [
	{
		project: "SketchSync",
		description:
			"A real-time collaborative whiteboard. A multiplayer canvas for sketching and brainstorming, with low-latency live sync so teams can draw together in real time. Built to stay smooth under concurrent editing.",
		technologies: ["React", "React-Konva", "WebSocket", "Node.js", "Express"],
		website: "https://sketchsync.onrender.com/",
		sourceCode: "https://github.com/sahaniindrajit/sketchsync",
		category: "Full Stack",
		workType: "Personal",
		notable: true,
	},
	{
		project: "PDF-Talk",
		description:
			"Ask questions to any PDF. Upload a document and ask it questions in plain language. It uses embeddings and semantic search (RAG) to return accurate, context-aware answers, built for document-heavy workflows.",
		technologies: ["Next.js", "Langchain", "Pinecone", "Hugging Face", "MongoDB"],
		website: "https://pdf-talk-opal.vercel.app/",
		sourceCode: "https://github.com/sahaniindrajit/Pdf-talk",
		category: "AI / Full Stack",
		workType: "Personal",
		notable: true,
	},
	{
		project: "Rezumi",
		description:
			"An AI resume builder that generates job-tailored, ATS-friendly resumes by reading a job description and structuring the most relevant skills and experience. Powered by Google Gemini.",
		technologies: ["TypeScript", "Next.js", "Google Gemini"],
		sourceCode: "https://github.com/sahaniindrajit/Rezumi",
		category: "AI / Full Stack",
		workType: "Personal",
		notable: true,
	},
	{
		project: "NotionLeager",
		description:
			"A Telegram bot for expense tracking that uses Notion as the database backend. Written in Go, a deliberate step outside the JS ecosystem.",
		technologies: ["Go", "Telegram Bot API", "Notion API"],
		sourceCode: "https://github.com/sahaniindrajit/NotionLeager",
		category: "Backend",
		workType: "Personal",
	},
	{
		project: "ManageFiasco",
		description:
			"A task-management dashboard with a Kanban board, list views, authentication, and drag-and-drop prioritization.",
		technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
		website: "https://managefiasco.vercel.app/",
		sourceCode: "https://github.com/sahaniindrajit/Task-Manager",
		category: "Full Stack",
		workType: "Personal",
	},
	{
		project: "Spotify to YouTube",
		description:
			"Converts Spotify playlists into YouTube playlists in a few clicks, using the Spotify and YouTube Data APIs.",
		technologies: ["Node.js", "Spotify API", "YouTube Data API"],
		sourceCode:
			"https://github.com/sahaniindrajit/Spotify-playlist-to-YouTube-Backend",
		category: "Backend",
		workType: "Personal",
	},
	{
		project: "Toupe",
		description: "A payment app with backend integration and deployment.",
		technologies: ["Node.js", "TypeScript", "Payments"],
		website: "https://toupe-payment-app.onrender.com/",
		category: "Full Stack",
		workType: "Personal",
	},
];

export default function ProjectsPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Indrajit Sahani's Projects",
		description:
			"Portfolio of projects built by Indrajit Sahani, including web applications, AI tools, and open-source contributions.",
		url: "https://indrajitsahani.com/projects",
		author: {
			"@type": "Person",
			name: "Indrajit Sahani",
			url: "https://indrajitsahani.com",
		},
		mainEntity: {
			"@type": "ItemList",
			itemListElement: projectsData.map((project, index) => ({
				"@type": "ListItem",
				position: index + 1,
				item: {
					"@type": "SoftwareApplication",
					name: project.project,
					description: project.description,
					applicationCategory: "WebApplication",
					url: project.website || project.sourceCode,
				},
			})),
		},
	};

	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: "https://indrajitsahani.com" },
		{ name: "Projects", url: "https://indrajitsahani.com/projects" },
	]);

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbJsonLd),
				}}
			/>
			<h1 className="font-medium text-2xl mb-4 tracking-tight">Projects 🚀</h1>
			<p className="sr-only">
				A showcase of projects built by Indrajit Sahani, including full-stack applications, AI tools, and developer utilities. Built with technologies like React, Next.js, TypeScript, Node.js, Go, WebSocket, Langchain, and more. Each project solves a real problem and ships.
			</p>

			{/* Projects Section */}
			<div className="prose prose-neutral dark:prose-invert">
				{projectsData.map((project, index) => (
					<ProjectCard
						key={index}
						title={project.project}
						description={project.description}
						technologies={project.technologies}
						website={project.website}
						sourceCode={project.sourceCode}
						category={project.category}
						workType={project.workType}
						notable={project.notable}
					/>
				))}
			</div>
		</section>
	);
}
