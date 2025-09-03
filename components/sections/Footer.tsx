import { Logo } from "@/components/logo";
import Link from "next/link";

import { LandingContent } from "@/content/LandingContent";

import { Phone, Mail } from "lucide-react";


export default function Footer() {
	const footerContent = LandingContent.footer;
	return (
		<footer className="py-16 md:py-24 border-t">
			<div className="mx-auto max-w-6xl px-6 space-y-12">
				{/* Logo */}
				<Link href="/" aria-label="go home" className="mx-auto block w-fit">
					<Logo />
				</Link>

				{/* Socials */}
				<div className="flex justify-center gap-6">
					{footerContent.socials.map((social, index) => {
						const Icon = social.icon;
						return (
							<Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-muted-foreground hover:text-primary transition">
								<Icon className="h-6 w-6" />
							</Link>
						);
					})}
				</div>

				{/* Contact Info */}
				<div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
					<p className="flex items-center gap-2">
						<Mail className="h-4 w-4" /> {footerContent.contact.email}
					</p>
                    |
					<p className="flex items-center gap-2">
						<Phone className="h-4 w-4" /> {footerContent.contact.phone}
					</p>
				</div>

				{/* Copyright */}
				<span className="block text-center text-xs text-muted-foreground">© {new Date().getFullYear()} SeatTracker, All rights reserved.</span>
			</div>
		</footer>
	);
}
