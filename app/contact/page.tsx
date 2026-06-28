import {
	EnvelopeSimple,
	LinkedinLogo,
	XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { generateBreadcrumbJsonLd } from "app/utils/jsonLd";
import type { Metadata } from "next";
import Separator from "../components/separator";
import { config } from "../config/config";

export const metadata: Metadata = {
	metadataBase: new URL("https://indrajitsahani.com"),
	title: "Contact",
	description:
		"Get in touch with Indrajit Sahani for remote roles, freelance projects, or collaborations. Reach out via email or a DM on X.",
	keywords: [
		"Contact Indrajit Sahani",
		"Hire Full Stack Developer",
		"Freelance Developer",
		"Remote Developer",
		"Web Developer for Hire",
	],
	alternates: {
		canonical: "/contact",
	},
	openGraph: {
		title: "Contact Indrajit Sahani - Hire a Full-Stack Developer",
		description:
			"Get in touch with Indrajit Sahani for remote roles, freelance projects, or collaborations. Reach out via email or a DM on X.",
		url: "https://indrajitsahani.com/contact",
		siteName: "Indrajit Sahani's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact Indrajit Sahani - Hire a Full-Stack Developer",
		description:
			"Get in touch with Indrajit Sahani for remote roles, freelance projects, or collaborations. Reach out via email or a DM on X.",
		creator: "@sahani_indrajit",
		site: "@sahani_indrajit",
	},
};

export default function ContactPage() {
	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: "https://indrajitsahani.com" },
		{ name: "Contact", url: "https://indrajitsahani.com/contact" },
	]);

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbJsonLd),
				}}
			/>
			<h1 className='font-medium text-2xl mb-6 tracking-tight font-["monospace"]'>
				Let's build something 📧
			</h1>
			<p className="sr-only">
				Contact Indrajit Sahani, a product-minded Full-Stack Developer open to
				remote roles, freelance work, and collaborations, especially with
				early-stage teams shipping fast. Reach out via email or a direct message
				on X.
			</p>

			<div className="prose prose-neutral dark:prose-invert">
				<p>
					I'm open to remote roles, freelance work, and collaborations,
					especially with early-stage teams shipping fast. The fastest way to
					reach me is a DM on X or an email. I'll get back to you.
				</p>

				<Separator />

				<div className="not-prose space-y-3 mt-6">
					<a
						href={`mailto:${config.socials.email}`}
						className="flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
					>
						<EnvelopeSimple size={22} />
						<span className="text-sm">{config.socials.email}</span>
					</a>
					<a
						href={config.socials.twitter}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
					>
						<XLogo size={22} />
						<span className="text-sm">DM me on X (@sahani_indrajit)</span>
					</a>
					<a
						href={config.socials.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
					>
						<LinkedinLogo size={22} />
						<span className="text-sm">Connect on LinkedIn</span>
					</a>
				</div>
			</div>
		</section>
	);
}
