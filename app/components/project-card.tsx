import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Separator from "./separator";
import Chip from "./chip";

interface ProjectCardProps {
	title: string;
	logo?: string;
	description: string;
	technologies: string[];
	website?: string;
	sourceCode?: string;
	category?: string;
	workType?: string;
	notable?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
	title,
	logo,
	description,
	technologies,
	website,
	sourceCode,
	category,
	workType,
	notable,
}) => {
	const primaryLink = website || sourceCode || "#";

	return (
		<div className="mb-6">
			<div className="flex items-center mb-2">
				{logo ? (
					<Image
						src={logo}
						alt={title}
						width={24}
						height={24}
						className="mr-4"
					/>
				) : (
					<p className="mt-0 mb-0">{"->"}</p>
				)}
				<h3 className="font-medium text-xl tracking-tight mt-0 mb-0 ml-1">
					<Link href={primaryLink} target="_blank" rel="noopener noreferrer">
						{title}
					</Link>
				</h3>
				{notable && (
					<span className="not-prose inline-flex items-center gap-1.5 ml-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full text-amber-950 dark:text-amber-100 bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 dark:from-amber-500/25 dark:via-yellow-500/20 dark:to-amber-400/25 ring-1 ring-inset ring-amber-400/60 dark:ring-amber-300/40 shadow-sm shadow-amber-500/30">
						<span aria-hidden="true" className="text-amber-600 dark:text-amber-300">★</span>
						Top Project
					</span>
				)}
			</div>
			{(category || workType) && (
				<p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-2">
					{category && workType
						? `${category} | ${workType}`
						: category || workType}
				</p>
			)}
			<p className="text-neutral-600 dark:text-neutral-400 text-sm">
				{description}
			</p>
			<div className="flex flex-wrap gap-2 mt-2">
				{technologies.map((tech, idx) => (
					<Chip key={idx} tech={tech} />
				))}
			</div>
			{(website || sourceCode) && (
				<div className="flex flex-wrap gap-4 mt-3 text-sm">
					{website && (
						<a
							href={website}
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:no-underline"
						>
							Live ↗
						</a>
					)}
					{sourceCode && (
						<a
							href={sourceCode}
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:no-underline"
						>
							Code ↗
						</a>
					)}
				</div>
			)}
			<Separator />
		</div>
	);
};

export default ProjectCard;
