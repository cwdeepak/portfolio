import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { Button } from '@/app/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { useTheme } from 'next-themes';
import gsap from 'gsap';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const { theme } = useTheme();

	const headerRef = useRef(null);
	const navRefs = useRef([]);
	const indicatorRef = useRef(null);
	const mobileMenuRef = useRef(null);
	const lastScrollY = useRef(0);
	const scrollTimeoutRef = useRef(null);
	const throttleTimeoutRef = useRef(null);
	const activeSectionRef = useRef('');
	const isMenuOpenRef = useRef(false);
	const isHiddenRef = useRef(false);

	const navItems = [
		{ id: 'work', label: 'Work' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'contact', label: 'Contact' }
	];

	const moveIndicator = sectionId => {
		const activeIndex = navItems.findIndex(item => item.id === sectionId);
		if (activeIndex === -1 || !navRefs.current[activeIndex] || !indicatorRef.current) return;

		const activeButton = navRefs.current[activeIndex];
		const rect = activeButton.getBoundingClientRect();
		const navRect = activeButton.parentElement.getBoundingClientRect();

		gsap.to(indicatorRef.current, {
			x: rect.left - navRect.left,
			width: rect.width,
			opacity: sectionId ? 1 : 0,
			duration: 0.2,
			ease: 'power2.out'
		});
	};

	useEffect(() => {
		if (!headerRef.current) return undefined;

		gsap.set(headerRef.current, { y: -90, opacity: 0 });
		gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.08 });

		const findActiveSection = () => {
			const sections = ['hero', 'work', 'skills', 'experience', 'contact'];
			const scrollPosition = window.scrollY + 120;

			if (window.scrollY < 100) return 'hero';
			for (const section of sections) {
				const el = document.getElementById(section);
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				const top = window.scrollY + rect.top;
				const bottom = top + rect.height;
				if (scrollPosition >= top && scrollPosition < bottom) return section;
			}
			return '';
		};

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - lastScrollY.current;
			const isDesktop = window.innerWidth >= 768;

			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

			if (isDesktop && Math.abs(scrollDelta) > 6) {
				if (scrollDelta > 0 && currentScrollY > 120 && !isMenuOpenRef.current && !isHiddenRef.current) {
					isHiddenRef.current = true;
					gsap.to(headerRef.current, { y: -100, duration: 0.24, ease: 'power2.out' });
				}
				if (scrollDelta < 0 && isHiddenRef.current) {
					isHiddenRef.current = false;
					gsap.to(headerRef.current, { y: 0, duration: 0.2, ease: 'power2.out' });
				}
			}

			lastScrollY.current = currentScrollY;
			setScrolled(currentScrollY > 18);

			scrollTimeoutRef.current = setTimeout(() => {
				if (isDesktop && isHiddenRef.current && !isMenuOpenRef.current) {
					isHiddenRef.current = false;
					gsap.to(headerRef.current, { y: 0, duration: 0.25, ease: 'power2.out' });
				}
			}, 140);

			const nextSection = findActiveSection();
			if (nextSection !== activeSectionRef.current) {
				activeSectionRef.current = nextSection;
				setActiveSection(nextSection);
				moveIndicator(nextSection);
			}
		};

		const throttled = () => {
			if (!throttleTimeoutRef.current) {
				throttleTimeoutRef.current = setTimeout(() => {
					handleScroll();
					throttleTimeoutRef.current = null;
				}, 16);
			}
		};

		const onResize = () => moveIndicator(activeSectionRef.current);
		window.addEventListener('scroll', throttled);
		window.addEventListener('resize', onResize);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', throttled);
			window.removeEventListener('resize', onResize);
			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
			if (throttleTimeoutRef.current) clearTimeout(throttleTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		isMenuOpenRef.current = isMenuOpen;
		if (!mobileMenuRef.current) return;

		if (isMenuOpen) {
			if (isHiddenRef.current) {
				isHiddenRef.current = false;
				gsap.to(headerRef.current, { y: 0, duration: 0.2, ease: 'power2.out' });
			}
			gsap.killTweensOf(mobileMenuRef.current);
			gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });
			gsap.to(mobileMenuRef.current, { height: 'auto', opacity: 1, duration: 0.2, ease: 'power2.out' });
		} else {
			gsap.killTweensOf(mobileMenuRef.current);
			gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.16, ease: 'power2.out' });
		}
	}, [isMenuOpen]);

	const scrollToSection = id => {
		const element = document.getElementById(id);
		if (element) {
			const y = element.getBoundingClientRect().top + window.scrollY - 96;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
		setIsMenuOpen(false);
	};

	return (
		<header
			ref={headerRef}
			className={`fixed top-[env(safe-area-inset-top)] left-0 right-0 w-screen z-50 md:top-4 md:left-1/2 md:right-auto md:w-fit md:-translate-x-1/2 md:max-w-[96vw] lg:max-w-[90vw] backdrop-blur-xl shadow-lg border rounded-none md:rounded-2xl lg:rounded-3xl transition-colors ${
				scrolled
					? 'bg-white/92 dark:bg-slate-900/92 border-slate-200/70 dark:border-slate-800/70'
					: 'bg-white/75 dark:bg-slate-900/75 border-slate-200/40 dark:border-slate-800/40'
			}`}
		>
			<div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 md:gap-8 w-full">
				<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
					<div className="w-8 h-8 bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold rounded-lg group-hover:scale-105 transition-transform duration-200">
						DS
					</div>
					<span className="text-sm font-semibold text-slate-900 dark:text-white hidden sm:block">Deepak Singh</span>
				</button>

				<nav className="hidden md:flex items-center space-x-1 relative">
					<div
						ref={indicatorRef}
						className="absolute bottom-0 h-0.5 bg-slate-900 dark:bg-white rounded-full"
						style={{ opacity: activeSection ? 1 : 0 }}
					/>
					{navItems.map((item, index) => (
						<button
							key={item.id}
							ref={el => (navRefs.current[index] = el)}
							onClick={() => scrollToSection(item.id)}
							className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
								activeSection === item.id
									? 'text-slate-900 dark:text-white'
									: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
							}`}
						>
							{item.label}
						</button>
					))}
				</nav>

				<div className="hidden md:flex items-center space-x-3">
					<ThemeToggle />
					<Button
						asChild
						size="sm"
						className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
					>
						<a href="/resume.pdf" download className="flex items-center gap-2">
							<FiDownload className="w-3 h-3" />
							Resume
						</a>
					</Button>
				</div>

				<div className="flex md:hidden items-center space-x-2">
					<ThemeToggle />
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<div
					onClick={() => setIsMenuOpen(false)}
					className={`md:hidden fixed inset-0 z-40 ${theme === 'dark' ? 'bg-black/45' : 'bg-black/20'}`}
				/>
			)}

			<div
				ref={mobileMenuRef}
				className={`md:hidden fixed left-0 right-0 top-[calc(env(safe-area-inset-top)+64px)] z-50 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-200 dark:border-slate-800 ${
					isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
				}`}
				style={{ height: 0, opacity: 0 }}
			>
				<div className="px-6 py-6">
					<nav className="flex flex-col space-y-2">
						{navItems.map(item => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className={`text-center px-6 py-4 text-lg font-medium w-full border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-all duration-200 ${
									activeSection === item.id
										? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
										: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
								}`}
							>
								{item.label}
							</button>
						))}
					</nav>
					<div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
						<Button
							asChild
							className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-md shadow-sm py-3"
						>
							<a href="/resume.pdf" download className="flex items-center justify-center gap-2">
								<FiDownload className="w-4 h-4" />
								Download Resume
							</a>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
