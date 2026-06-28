import {
	EnvelopeSimple,
	GithubLogo,
	LinkedinLogo,
	NotePencil,
	XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { FC } from "react";
import { config } from "../config/config";

const socialLinks = [
	{
		name: "Email",
		url: `mailto:${config.socials.email}`,
		logo: EnvelopeSimple,
	},
	{
		name: "GitHub",
		url: config.socials.github,
		logo: GithubLogo,
	},
	{
		name: "X",
		url: config.socials.twitter,
		logo: XLogo,
	},
	{
		name: "LinkedIn",
		url: config.socials.linkedin,
		logo: LinkedinLogo,
	},
	{
		name: "Blog",
		url: config.socials.blog,
		logo: NotePencil,
	},
];

const Footer: FC = () => {
	return (
		<footer className="mt-8" aria-label="Footer">
			<h2 className="sr-only">Connect with Indrajit Sahani on social media</h2>
			<p className="sr-only">
				Follow Indrajit Sahani on GitHub, X (Twitter), and LinkedIn, read his
				blog, or send an email to get in touch about full-stack development
				roles, freelance work, and collaborations.
			</p>
			<nav aria-label="Social media links" className="flex justify-center">
				<ul className="flex gap-4">
					{socialLinks.map((social, index) => {
						const isInternal = social.url.startsWith("/");
						return (
							<li key={index}>
								<a
									href={social.url}
									target={isInternal ? undefined : "_blank"}
									rel={isInternal ? undefined : "noopener noreferrer"}
									aria-label={`${social.name} - Connect with Indrajit Sahani`}
									className="inline-block p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
								>
									<social.logo size={24} aria-hidden="true" />
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
