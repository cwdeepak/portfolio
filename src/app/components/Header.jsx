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
	const [isHidden, setIsHidden] = useState(false);
	const { theme } = useTheme();
	const headerRef = useRef(null);
	const navRefs = useRef([]);
	const indicatorRef = useRef(null);
	const mobileMenuRef = useRef(null);
	const lastScrollY = useRef(0);
	const scrollTimeoutRef = useRef(null);
	const isScrollingRef = useRef(false);
	const throttleTimeoutRef = useRef(null);

	// Throttled scroll handler
	const throttledScrollHandler = () => {
		if (!throttleTimeoutRef.current) {
			throttleTimeoutRef.current = setTimeout(() => {
				handleScroll();
				throttleTimeoutRef.current = null;
			}, 16); // ~60fps
		}
	};

	useEffect(() => {
		let tl;

		if (headerRef.current) {
			tl = gsap.timeline();
			gsap.set(headerRef.current, { y: -100, opacity: 0 });
			tl.to(headerRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power3.out',
				delay: 0.2
			});
		}

		// Initialize indicator position after a short delay to ensure refs are set
		const timer = setTimeout(() => {
			if (navRefs.current[0] && indicatorRef.current) {
				const firstButton = navRefs.current[0];
				const rect = firstButton.getBoundingClientRect();
				const navRect = firstButton.parentElement.getBoundingClientRect();

				gsap.set(indicatorRef.current, {
					x: rect.left - navRect.left,
					width: rect.width,
					opacity: 0
				});
			}
		}, 100);

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDelta = currentScrollY - lastScrollY.current;

			// Clear existing timeout
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			// Set scrolling flag
			isScrollingRef.current = true;

			// Handle header hide/show based on scroll direction with better logic
			if (Math.abs(scrollDelta) > 5) {
				// Only react to significant scroll changes
				if (scrollDelta > 0 && currentScrollY > 100 && !isMenuOpen) {
					// Scrolling down and past 100px and mobile menu not open - hide header
					if (!isHidden) {
						setIsHidden(true);
						gsap.to(headerRef.current, {
							y: -100,
							duration: 0.4,
							ease: 'power2.out'
						});
					}
				} else if (scrollDelta < 0 && isHidden) {
					// Scrolling up and header is hidden - show header immediately
					setIsHidden(false);
					gsap.to(headerRef.current, {
						y: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
			}

			lastScrollY.current = currentScrollY;
			setScrolled(currentScrollY > 20);

			// Set timeout to detect when scrolling stops
			scrollTimeoutRef.current = setTimeout(() => {
				isScrollingRef.current = false;
				// Auto-show header if it's hidden and scrolling has stopped
				if (isHidden && !isMenuOpen) {
					setIsHidden(false);
					gsap.to(headerRef.current, {
						y: 0,
						duration: 0.5,
						ease: 'power2.out'
					});
				}
			}, 150); // Wait 150ms after scroll stops

			// Improved active section detection
			const sections = ['hero', 'work', 'skills', 'experience', 'contact'];
			let newActiveSection = '';
			const scrollPosition = window.scrollY + 100; // Offset for header height

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					const elementTop = window.scrollY + rect.top;
					const elementBottom = elementTop + rect.height;

					if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
						newActiveSection = section;
						break;
					}
				}
			}

			// Special case for hero section at top
			if (window.scrollY < 100) {
				newActiveSection = 'hero';
			}

			if (newActiveSection !== activeSection) {
				setActiveSection(newActiveSection);
				// Animate indicator to new position
				const activeIndex = navItems.findIndex(item => item.id === newActiveSection);
				if (activeIndex !== -1 && navRefs.current[activeIndex] && indicatorRef.current) {
					const activeButton = navRefs.current[activeIndex];
					const rect = activeButton.getBoundingClientRect();
					const navRect = activeButton.parentElement.getBoundingClientRect();

					gsap.to(indicatorRef.current, {
						x: rect.left - navRect.left,
						width: rect.width,
						opacity: newActiveSection ? 1 : 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
			}
		};

		window.addEventListener('scroll', throttledScrollHandler);
		handleScroll(); // Call once to set initial state

		return () => {
			window.removeEventListener('scroll', throttledScrollHandler);
			clearTimeout(timer);
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
			if (throttleTimeoutRef.current) {
				clearTimeout(throttleTimeoutRef.current);
			}
			if (tl) tl.kill();
		};
	}, [activeSection]);

	// Mobile menu animation effect
	useEffect(() => {
		if (mobileMenuRef.current) {
			if (isMenuOpen) {
				// Show header when mobile menu opens
				if (isHidden) {
					setIsHidden(false);
					gsap.to(headerRef.current, {
						y: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				}

				gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });
				gsap.to(mobileMenuRef.current, {
					height: 'auto',
					opacity: 1,
					duration: 0.3,
					ease: 'power2.out'
				});
			} else {
				gsap.to(mobileMenuRef.current, {
					height: 0,
					opacity: 0,
					duration: 0.3,
					ease: 'power2.out'
				});
			}
		}
	}, [isMenuOpen, isHidden]);

	const scrollToSection = id => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setIsMenuOpen(false);
	};

	const navItems = [
		{ id: 'work', label: 'Work' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'contact', label: 'Contact' }
	];

	return (
		<header
			ref={headerRef}
			className="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 mb-2 md:mb-0 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-lg border border-slate-200/70 dark:border-slate-800/70 rounded-none md:rounded-2xl lg:rounded-3xl max-w-full md:max-w-[98vw] lg:max-w-[90vw] w-full md:w-fit px-0 sm:px-2 md:px-4"
		>
			<div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 md:gap-8 w-full">
				{/* Logo */}
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="flex items-center gap-3 group"
				>
					<div className="w-8 h-8 bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold rounded-lg group-hover:scale-105 transition-transform duration-200">
						DS
					</div>
					<span className="text-sm font-semibold text-slate-900 dark:text-white hidden sm:block">Deepak Singh</span>
				</button>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-1 relative">
					{/* Active Indicator */}
					<div
						ref={indicatorRef}
						className="absolute bottom-0 h-0.5 bg-slate-900 dark:bg-white rounded-full transition-all duration-300 ease-out"
						style={{ opacity: activeSection ? 1 : 0 }}
					></div>

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

				{/* Desktop Actions */}
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

				{/* Mobile Menu Toggle */}
				<div className="flex md:hidden items-center space-x-2">
					<ThemeToggle />
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
					>
						{isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div
					onClick={() => setIsMenuOpen(false)}
					className={`md:hidden fixed inset-0 z-40 ${theme === 'dark' ? 'bg-black/45' : 'bg-black/20'}`}
				></div>
			)}
			<div
				ref={mobileMenuRef}
				className="md:hidden absolute top-full left-0 right-0 w-screen z-50 bg-white dark:bg-slate-900 shadow-lg border-t border-slate-200 dark:border-slate-800 rounded-none md:rounded-2xl"
				style={{ height: 0, opacity: 0, backdropFilter: 'none' }}
			>
				<div className="px-6 py-6">
					<nav className="flex flex-col space-y-2">
						{navItems.map(item => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className={`text-center md:text-left px-6 py-4 text-lg font-medium w-full border-b border-slate-100 dark:border-slate-800 last:border-b-0 rounded-none md:rounded-lg transition-all duration-200 ${
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
							className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-md shadow-sm py-3 md:rounded-lg"
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
