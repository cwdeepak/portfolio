import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaReact, FaJs, FaCss3Alt, FaHtml5, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si';
import CopyEmail from './CopyEmail';
import profileImg from '../../../public/profileImage.jpg';

export function Hero() {
	const heroRef = useRef(null);
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const descriptionRef = useRef(null);
	const skillsRef = useRef([]);
	const contactRef = useRef(null);
	const buttonsRef = useRef(null);
	const socialRef = useRef(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const orbitItems = 8;

	const getOrbitRadius = expanded => {
		const isLg = typeof window !== 'undefined' ? window.innerWidth >= 1280 : false;
		if (expanded) return isLg ? 210 : 178;
		return isLg ? 168 : 146;
	};

	const setSkillOrbit = ({ radius, animate = false, opacity, scale, rotation = 0, duration = 0.35 }) => {
		skillsRef.current.forEach((el, index) => {
			if (!el || index >= orbitItems) return;
			const angle = (index / orbitItems) * 360 - 90;
			const radian = (angle * Math.PI) / 180;
			const x = Math.cos(radian) * radius;
			const y = Math.sin(radian) * radius;
			const vars = { x, y, duration, ease: 'power2.out' };

			if (opacity !== undefined) vars.opacity = opacity;
			if (scale !== undefined) vars.scale = scale;
			if (rotation !== undefined) vars.rotation = rotation;

			if (animate) {
				gsap.to(el, vars);
			} else {
				gsap.set(el, { x, y, opacity, scale, rotation });
			}
		});
	};

	useEffect(() => {
		const tl = gsap.timeline();

		// Set initial states for all elements
		gsap.set(
			[
				imageRef.current,
				titleRef.current,
				subtitleRef.current,
				descriptionRef.current,
				contactRef.current,
				buttonsRef.current,
				socialRef.current
			],
			{
				opacity: 0,
				y: 30
			}
		);

		// Keep skill chips hidden until hover on desktop
		gsap.set(skillsRef.current.filter(Boolean), {
			opacity: 0,
			scale: 0,
			rotation: 0
		});
		setSkillOrbit({ radius: getOrbitRadius(false), animate: false, opacity: 0, scale: 0, rotation: 0 });

		// Animate elements in sequence
		tl.to(imageRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
			.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0)
			.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
			.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
			.to(contactRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
			.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
			.to(socialRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');

		// Skills will animate on hover after initial hide

		// Cleanup function
		return () => {
			tl.kill();
		};
	}, []);

	// Ensure skill positions are larger on desktop and respond to resize
	useEffect(() => {
		const setDesktopSkillPositions = () => {
			if (!skillsRef.current) return;
			setSkillOrbit({ radius: getOrbitRadius(false), animate: false, opacity: 0, scale: 0, rotation: 0 });
		};

		setDesktopSkillPositions();
		window.addEventListener('resize', setDesktopSkillPositions);
		return () => window.removeEventListener('resize', setDesktopSkillPositions);
	}, []);

	const skills = [
		{ icon: FaReact, name: 'React' },
		{ icon: FaJs, name: 'JavaScript' },
		{ icon: SiTailwindcss, name: 'Tailwind CSS' },
		{ icon: FaHtml5, name: 'HTML5' },
		{ icon: FaCss3Alt, name: 'CSS3' },
		{ icon: FaFigma, name: 'Figma' },
		{ icon: SiNextdotjs, name: 'Next.js' },
		{ icon: SiTypescript, name: 'TypeScript' },
		{ icon: FaNodeJs, name: 'Node.js' }
	];

	return (
		<section
			id="hero"
			ref={heroRef}
			className="min-h-screen relative overflow-hidden px-2 sm:px-4 md:px-6 scroll-mt-24 pt-[calc(env(safe-area-inset-top)+88px)] md:pt-0"
		>
			<div className="relative z-10 min-h-screen flex flex-col w-full">
				{/* Top Section - Status */}
				<div className="hidden md:flex justify-end items-start p-4 sm:p-6 lg:p-8 xl:p-12">
					<div className="text-right">
						<div className="text-slate-600 dark:text-white/60 text-[10px] sm:text-xs mb-0.5 lg:mb-1">Currently in</div>
						<div className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm lg:text-base">
							Jaipur, India
						</div>
					</div>
				</div>

				{/* Main Content Area */}
				<div className="flex-1 flex items-start md:items-center pt-5 sm:pt-6 md:pt-0">
					<div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
							{/* Left Column - Main Content */}
							<div className="lg:col-span-8 space-y-6 sm:space-y-8">
								{/* Greeting */}
								<div ref={titleRef} className="space-y-2 pt-6 sm:pt-8 md:pt-0 text-center md:text-left">
									<div ref={subtitleRef} className="flex items-center gap-2 justify-center md:justify-start mb-2">
										<span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-soft-blink"></span>
										<span className="text-green-400/95 text-[11px] sm:text-xs font-medium tracking-wide uppercase animate-soft-blink">
											Available for Projects
										</span>
									</div>
									<div className="text-slate-700 dark:text-white/80 text-lg sm:text-xl font-light">Hello, I'm</div>
									<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none">
										<span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent animate-pulse">
											Deepak
										</span>
									</h1>
									<div className="flex flex-wrap gap-1 sm:gap-2 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold justify-center md:justify-start">
										<span className="text-blue-600 dark:text-blue-400">UI/UX</span>
										<span className="text-slate-900 dark:text-white">+</span>
										<span className="text-purple-600 dark:text-purple-400">React</span>
										<span className="text-slate-900 dark:text-white">Developer</span>
									</div>
								</div>

								{/* Description */}
								<div ref={descriptionRef} className="max-w-2xl text-center md:text-left">
									<p className="text-slate-600 dark:text-white/70 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
										I transform <span className="text-slate-900 dark:text-white font-semibold">complex problems</span>{' '}
										into <span className="text-blue-600 dark:text-blue-400 font-semibold">beautiful solutions</span>.
										Bridging the gap between design thinking and technical excellence.
									</p>

									{/* Dynamic stats */}
									<div className="flex flex-wrap gap-6 sm:gap-8 text-sm justify-center md:justify-start">
										<div>
											<div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">10+</div>
											<div className="text-slate-500 dark:text-white/60">Projects</div>
										</div>
										<div>
											<div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">1+</div>
											<div className="text-slate-500 dark:text-white/60">Years Exp</div>
										</div>
										<div>
											<div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">100%</div>
											<div className="text-slate-500 dark:text-white/60">Happy Clients</div>
										</div>
									</div>
								</div>

								{/* CTA Actions */}
								<div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4 sm:items-center">
									<a
										href="#work"
										className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-base sm:text-lg overflow-hidden shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 z-10 touch-manipulation"
									>
										<span className="relative z-10 flex items-center gap-3">
											Explore My Work
											<FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
										</span>
										<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
									</a>

									<a
										href="/resume.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-900/30 dark:border-white/30 rounded-2xl text-slate-900 dark:text-white font-semibold text-base sm:text-lg hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-900/50 dark:hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-center touch-manipulation"
									>
										Download Resume
									</a>
								</div>
							</div>

							{/* Right Column - Profile Image */}
							<div className="lg:col-span-4 relative mt-8 lg:mt-0">
								{/* Profile Image */}
								<div
									className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[340px] xl:h-[340px] mx-auto group/image"
									onMouseEnter={() => {
										if (window.innerWidth < 1024) return;
										setSkillOrbit({
											radius: getOrbitRadius(true),
											animate: true,
											opacity: 1,
											scale: 1,
											rotation: 0,
											duration: 0.32
										});
									}}
									onMouseLeave={() => {
										if (window.innerWidth < 1024) return;
										setSkillOrbit({
											radius: getOrbitRadius(false),
											animate: true,
											opacity: 0,
											scale: 0,
											rotation: -90,
											duration: 0.24
										});
									}}
								>
									{/* Skills positioned around the profile image - only show on md and larger screens */}
									<div className="hidden md:block">
										{skills.slice(0, 8).map((skill, index) => {
											return (
												<div
													key={index}
													ref={el => {
														if (el) skillsRef.current[index] = el;
													}}
													className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-0"
												>
													<div className="w-full h-full bg-slate-100/10 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-slate-300/20 dark:border-white/20 flex items-center justify-center hover:bg-slate-200/20 dark:hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110 overflow-hidden">
														{/* Icon with 50% visibility initially, 100% on hover */}
														<div className="relative w-full h-full flex items-center justify-center">
															{/* Full icon - initially clipped to 50%, full on hover */}
															<div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:clip-path-none clip-path-[polygon(0_0,50%_0,50%_100%,0_100%)]">
																<skill.icon className="w-4 h-4 text-slate-700/80 dark:text-white/80 group-hover:text-slate-900 dark:group-hover:text-white" />
															</div>
															{/* Duplicate icon for the other half - only visible on hover */}
															<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
																<skill.icon className="w-4 h-4 text-slate-900 dark:text-white" />
															</div>
														</div>
													</div>
													<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900/80 dark:bg-black/80 text-slate-100 dark:text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-30">
														{skill.name}
														<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/80 dark:border-t-black/80"></div>
													</div>
												</div>
											);
										})}
									</div>

									{/* Background glow */}
									<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl scale-110 animate-pulse"></div>

									{/* Image container */}
									<div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl z-10 cursor-pointer">
										{!imageLoaded && (
											<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
												<div className="w-12 h-12 border-4 border-white/30 border-t-blue-400 rounded-full animate-spin"></div>
											</div>
										)}
										<img
											ref={imageRef}
											src={profileImg}
											alt="Deepak Singh"
											className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
											onLoad={() => setImageLoaded(true)}
											onError={() => setImageLoaded(true)}
										/>
									</div>

									{/* Floating badges */}
									<div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 lg:-top-3 lg:-right-3 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce z-20">
										<span className="text-white font-bold text-[10px] sm:text-xs">ONLINE</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section - Social & Contact */}
				<div
					ref={socialRef}
					className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 xl:py-12 mb-6 sm:mb-8"
				>
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 sm:gap-5">
						{/* Social Links */}
						<div className="flex gap-4 justify-center lg:justify-start">
							<a
								href="https://github.com/cwdeepak"
								target="_blank"
								rel="noopener noreferrer"
								className="w-12 h-12 bg-slate-100/10 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-slate-300/20 dark:border-white/20 flex items-center justify-center text-slate-700/80 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/20 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
							>
								<FiGithub className="w-5 h-5" />
							</a>
							<a
								href="https://www.linkedin.com/in/code-with-deepak"
								target="_blank"
								rel="noopener noreferrer"
								className="w-12 h-12 bg-slate-100/10 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-slate-300/20 dark:border-white/20 flex items-center justify-center text-slate-700/80 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/20 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110"
							>
								<FiLinkedin className="w-5 h-5" />
							</a>
						</div>

						{/* Contact */}
						<div ref={contactRef} className="flex flex-col items-center lg:items-end gap-2">
							<CopyEmail />
							<div className="text-slate-500 dark:text-white/60 text-sm text-center lg:text-right">
								Let's build something amazing together
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
