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
		"Get in touch with Indrajit Sahani, full-stack developer building Sendkit at Enrich Labs. Reach out via email, a DM on X, or LinkedIn.",
	keywords: [
		"Contact Indrajit Sahani",
		"Indrajit Sahani Email",
		"Full Stack Developer",
	],
	alternates: {
		canonical: "/contact",
	},
	openGraph: {
		title: "Contact Indrajit Sahani",
		description:
			"Get in touch with Indrajit Sahani, full-stack developer building Sendkit at Enrich Labs. Reach out via email, a DM on X, or LinkedIn.",
		url: "https://indrajitsahani.com/contact",
		siteName: "Indrajit Sahani's Portfolio",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact Indrajit Sahani",
		description:
			"Get in touch with Indrajit Sahani, full-stack developer building Sendkit at Enrich Labs. Reach out via email, a DM on X, or LinkedIn.",
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
				Contact Indrajit Sahani, a full-stack developer who owns Sendkit end to
				end at Enrich Labs. Reach out via email, a direct message on X, or
				LinkedIn.
			</p>

			<div className="prose prose-neutral dark:prose-invert">
				<p>
					Always happy to talk with people building interesting things, whether
					it's infra, email, AI tooling, or a product you're shipping fast. The
					fastest way to reach me is a DM on X or an email. I usually reply
					within a day.
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
