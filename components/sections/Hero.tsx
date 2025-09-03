import React from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { HeroHeader } from "@/components/HeroHeader";
import { LandingContent } from "@/content/LandingContent";
import CTAButtons from "../CTAButtons";

export default function Hero() {
	return (
		<>
			<HeroHeader />
			<main className="overflow-hidden min-h-screen">
				<div aria-hidden className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
					<div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
					<div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
					<div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				</div>
				<section>
					<div className="relative pt-24 md:pt-36">
						<div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
						<div className="mx-auto max-w-7xl px-6">
							<div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
								<TextEffect preset="fade-in-blur" speedSegment={0.3} as="h1" className="mx-auto mt-8 max-w-4xl text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
									{LandingContent.hero.title}
								</TextEffect>
								<TextEffect per="line" preset="fade-in-blur" speedSegment={0.3} delay={0.5} as="p" className="mx-auto mt-8 max-w-2xl text-balance text-lg">
									{LandingContent.hero.subtitle}
								</TextEffect>

								<CTAButtons />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
