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

const faqs = [
	{
		question: "Is Indrajit available for freelance or contract work?",
		answer:
			"Yes. Indrajit is open to remote roles, freelance projects, and collaborations, especially with early-stage teams shipping fast.",
	},
	{
		question: "What does Indrajit specialize in?",
		answer:
			"Product-minded full-stack development with React, Next.js, TypeScript, Node.js, Go, PostgreSQL, and Redis — taking products from idea to launch.",
	},
	{
		question: "What is the best way to get in touch?",
		answer:
			"The fastest way to reach Indrajit is a DM on X (@sahani_indrajit) or an email. He typically responds within a day.",
	},
];

export default function ContactPage() {
	const breadcrumbJsonLd = generateBreadcrumbJsonLd([
		{ name: "Home", url: "https://indrajitsahani.com" },
		{ name: "Contact", url: "https://indrajitsahani.com/contact" },
	]);

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
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
					__html: JSON.stringify(faqJsonLd),
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

				<Separator />

				<h2 className="mt-8">FAQ</h2>
				<dl className="mt-4">
					{faqs.map((faq) => (
						<div key={faq.question} className="mb-5">
							<dt className="font-medium text-neutral-900 dark:text-neutral-100">
								{faq.question}
							</dt>
							<dd className="mt-1 text-neutral-600 dark:text-neutral-400">
								{faq.answer}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
