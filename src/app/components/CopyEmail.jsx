import { useRef, useState } from 'react';
import gsap from 'gsap';
import { FaCopy, FaCheck } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';

export default function CopyEmail() {
	const [copied, setCopied] = useState(false);
	const [hovered, setHovered] = useState(false);
	const tooltipRef = useRef(null);
	const hoverTooltipRef = useRef(null);

	const email = 'codewithdeepak95@gmail.com';

	const handleCopy = () => {
		navigator.clipboard.writeText(email);
		setCopied(true);

		// GSAP fade + scale IN
		gsap.fromTo(
			tooltipRef.current,
			{ opacity: 0, y: 10, scale: 0.9 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }
		);

		// Auto-hide after 1.4s
		setTimeout(() => {
			gsap.to(tooltipRef.current, {
				opacity: 0,
				y: -10,
				scale: 0.9,
				duration: 0.3,
				ease: 'power3.in',
				onComplete: () => setCopied(false)
			});
		}, 1400);
	};

	const handleMouseEnter = () => {
		setHovered(true);
		gsap.fromTo(
			hoverTooltipRef.current,
			{ opacity: 0, y: 10, scale: 0.9 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }
		);
	};

	const handleMouseLeave = () => {
		setHovered(false);
		gsap.to(hoverTooltipRef.current, {
			opacity: 0,
			y: -10,
			scale: 0.9,
			duration: 0.3,
			ease: 'power3.in'
		});
	};

	return (
		<div className="relative inline-block">
			<button
				onClick={handleCopy}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="
          flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 transition-colors
        "
			>
				{copied ? (
					<FaCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
				) : (
					<FiMail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
				)}

				<span>{email}</span>
			</button>

			{/* Tooltip */}
			{copied && (
				<div
					ref={tooltipRef}
					className="
            absolute -top-10 left-1/2 -translate-x-1/2
            bg-slate-900 text-white
            dark:bg-slate-200 dark:text-slate-900
            text-xs px-3 py-1 rounded-lg shadow-lg
          "
					style={{ pointerEvents: 'none' }}
				>
					Copied!
				</div>
			)}

			{/* Hover Tooltip */}
			{hovered && !copied && (
				<div
					ref={hoverTooltipRef}
					className="
            absolute -top-10 left-1/2 -translate-x-1/2
            bg-slate-900 text-white
            dark:bg-slate-200 dark:text-slate-900
            text-xs px-3 py-1 rounded-lg shadow-lg
          "
					style={{ pointerEvents: 'none' }}
				>
					Click to copy
				</div>
			)}
		</div>
	);
}
