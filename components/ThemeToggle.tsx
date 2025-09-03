// ThemeToggle.tsx
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const dark = theme === "dark";
	return (
		<button
			onClick={() => setTheme(dark ? "light" : "dark")}
			className="w-auto flex-shrink-0 rounded-full p-2 border border-white/10 z-[20] cursor-pointer
             transition duration-300 ease-in-out
             hover:bg-gray-200 hover:scale-110 dark:hover:bg-gray-800">
			{dark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
