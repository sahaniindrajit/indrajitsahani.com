"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ISTClock from "./ist-clock";
import Chip from "./chip";
import { config } from "../config/config";

export function Navbar() {
	// Print the traditional PDF résumé instead of the web page. We prefer the
	// same-origin local copy (public/resume.pdf) because cross-origin PDFs
	// (e.g. Google Drive) can't be triggered to print programmatically. If the
	// local copy isn't present, fall back to opening the Drive link.
	const handlePrintResume = async () => {
		const { pdf, drive } = config.resume;
		const openDrive = () =>
			window.open(drive, "_blank", "noopener,noreferrer");

		try {
			const res = await fetch(pdf, { method: "HEAD" });
			if (!res.ok) {
				openDrive();
				return;
			}

			const frameId = "resume-print-frame";
			document.getElementById(frameId)?.remove();

			const iframe = document.createElement("iframe");
			iframe.id = frameId;
			iframe.src = pdf;
			iframe.setAttribute("aria-hidden", "true");
			iframe.style.position = "fixed";
			iframe.style.right = "0";
			iframe.style.bottom = "0";
			iframe.style.width = "0";
			iframe.style.height = "0";
			iframe.style.border = "0";
			iframe.style.visibility = "hidden";
			iframe.onload = () => {
				try {
					iframe.contentWindow?.focus();
					iframe.contentWindow?.print();
				} catch {
					openDrive();
				}
			};
			document.body.appendChild(iframe);
		} catch {
			openDrive();
		}
	};
	const currentRoute = usePathname();

	return (
		<aside className="-ml-[8px] mb-8 tracking-tight no-print">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-col sm:flex-row relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative gap-3 sm:gap-0 sm:items-center sm:justify-between"
					id="nav"
					aria-label="Main navigation"
				>
					<div className="flex flex-row flex-wrap space-x-0">
					{config.navigation.map(({ path, name }) => {
						const isActive = currentRoute === path;
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? "page" : undefined}
								className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2${isActive ? " font-semibold" : ""}`}
							>
								{name}
							</Link>
						);
					})}
					</div>
					<div className="flex items-center gap-3 flex-wrap">
						<ISTClock />
						{currentRoute === "/resume" && (
							<Chip
								onClick={handlePrintResume}
								className="flex items-center gap-1.5 whitespace-nowrap"
							>
								print résumé <span>🖨️</span>
							</Chip>
						)}
					</div>
				</nav>
			</div>
		</aside>
	);
}
