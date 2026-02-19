import { FiCode, FiHeart } from 'react-icons/fi';
export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-slate-100 dark:bg-slate-950 text-slate-500 py-6 sm:py-8 px-3 sm:px-6 border-t border-slate-200/50 dark:border-slate-800/50 text-xs sm:text-sm">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full">
					<p className="text-xs md:text-sm tracking-wider flex items-center gap-2">
						© {currentYear} Deepak Singh. All rights reserved.
					</p>
					<p className="text-xs md:text-sm tracking-wider flex items-center gap-2">
						<FiCode className="w-4 h-4 text-slate-500" />
						<span>Designed & Developed with AI, Built with</span>
						<FiHeart className="w-3 h-3 text-slate-400 fill-slate-400" />
						<span>using React & Tailwind</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
