export const config = {
	profile: {
		name: "Indrajit Sahani",
		jobTitle: "Full-Stack Developer",
		codingStartDate: "2020-01-01", // When you started coding
		professionalStartDate: "2024-01-01", // When you started working on production apps
		availableForFreelance: true,
	},
	blog: {
		// Hashnode publication host. Posts are pulled from the public Hashnode
		// GraphQL API and rendered on-domain at /blog and /blog/[slug].
		hashnodeHost: "sahaniindrajit.hashnode.dev",
	},
	navigation: [
		{ path: "/", name: "Home" },
		{ path: "/projects", name: "Projects" },
		{ path: "/blog", name: "Blog" },
		{ path: "/resume", name: "Resume" },
		{ path: "/contact", name: "Contact" },
	],
	companies: {
		enrichLabs: "https://sendkit.ai",
		sendkit: "https://sendkit.ai",
		linkbird: "https://linkbird.ai",
	},
	education: {
		ipu: "http://www.ipu.ac.in/",
	},
	resume: {
		// Local copy used for the in-browser print button (same-origin, so it can
		// auto-print). Drop the PDF at public/resume.pdf to enable local printing.
		pdf: "/resume.pdf",
		// Public Google Drive link, used for "View PDF" and as a print fallback
		// until the local copy exists.
		drive:
			"https://drive.google.com/file/d/1-guiwqpad-7ZBwQLw5DvBr_gZXdYpG4O/view?usp=sharing",
	},
	socials: {
		email: "indrajit38mig@gmail.com",
		github: "https://github.com/sahaniindrajit",
		twitter: "https://x.com/sahani_indrajit",
		linkedin: "https://www.linkedin.com/in/indrajitsahani/",
		blog: "https://sahaniindrajit.hashnode.dev/",
	},
};
