import { cn } from "@/lib/utils";

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
	return (
		<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" className={cn("text-foreground h-8 w-auto", className)} fill="none">
			{/* Icon: Seat + Study Lamp */}
			<g transform="translate(0,5)">
				{/* Seat base */}
				<rect x="4" y="18" width="20" height="6" rx="1.5" fill={uniColor ? "currentColor" : "url(#logo-gradient)"} />
				{/* Seat back */}
				<rect x="4" y="6" width="4" height="14" rx="1.5" fill={uniColor ? "currentColor" : "url(#logo-gradient)"} />
				{/* Lamp arm */}
				<path d="M18 6 L26 2" stroke={uniColor ? "currentColor" : "url(#logo-gradient)"} strokeWidth="2" strokeLinecap="round" />
				{/* Lamp bulb */}
				<circle cx="27" cy="1.5" r="2.5" fill={uniColor ? "currentColor" : "url(#logo-gradient)"} />
			</g>

			{/* Text: SeatTracker */}
			<text x="40" y="25" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="currentColor">
				SeatTracker
			</text>

			{/* Gradient definition */}
			<defs>
				<linearGradient id="logo-gradient" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
					<stop stopColor="#9B99FE" />
					<stop offset="1" stopColor="#2BC8B7" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const LogoIcon = () => {
	return (
		<svg width="160" height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" fill="none">
			
			{/* Text: SeatTracker */}
			<text x="45" y="28" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="600" fill="currentColor">
				SeatTracker
			</text>

			<defs>
				<linearGradient id="logo-gradient" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
					<stop stopColor="#9B99FE" />
					<stop offset="1" stopColor="#2BC8B7" />
				</linearGradient>
			</defs>
		</svg>
	);
};
