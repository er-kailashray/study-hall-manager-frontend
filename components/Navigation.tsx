"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "./ThemeToggle";

export default function AppNavbar() {
	const navItems = [
		{ name: "Features", link: "#features" },
		{ name: "Pricing", link: "#pricing" },
		{ name: "Contact", link: "#contact" },
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// detect scroll
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 30 }} className={cn("sticky top-0 z-50 w-full transition-all duration-300 border-b", scrolled ? "bg-background/80 backdrop-blur-xl border-white/10 dark:border-white/20" : "bg-transparent")}>
			{/* Desktop Navbar */}
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					<NavbarButton variant="primary">Login</NavbarButton>
                    <ThemeToggle />
				</div>
			</NavBody>

			{/* Mobile Navbar */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
				</MobileNavHeader>

				<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
					{navItems.map((item, idx) => (
						<Link key={`mobile-link-${idx}`} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="relative text-neutral-600 dark:text-neutral-300">
							{item.name}
						</Link>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full">
							Login
						</NavbarButton>
						<ThemeToggle />
					</div>
				</MobileNavMenu>
			</MobileNav>
		</motion.div>
	);
}
