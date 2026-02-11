import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 animate-pulse" />
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="relative w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow-md"
			aria-label="Toggle theme"
		>
			<FiSun className="w-5 h-5 text-slate-600 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
			<FiMoon className="absolute w-5 h-5 text-slate-400 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
		</button>
	);
}
