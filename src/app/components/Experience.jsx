import { FiCalendar, FiMapPin, FiBriefcase, FiCode, FiTrendingUp, FiCheckCircle, FiUser } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const timelineRef = useRef(null);
	const experiencesRef = useRef([]);
	const dotsRef = useRef([]);
	const highlightRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Header animation with advanced stagger
			if (headerRef.current) {
				const headerTl = gsap.timeline({
					scrollTrigger: {
						trigger: headerRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});

				headerTl
					.from(headerRef.current.querySelector('.badge'), {
						y: 30,
						opacity: 0,
						scale: 0.8,
						duration: 0.8,
						ease: 'back.out(1.7)'
					})
					.from(
						headerRef.current.querySelector('h2'),
						{
							y: 50,
							opacity: 0,
							duration: 1,
							ease: 'power3.out'
						},
						'-=0.4'
					)
					.from(
						headerRef.current.querySelector('p'),
						{
							y: 30,
							opacity: 0,
							duration: 0.8,
							ease: 'power2.out'
						},
						'-=0.6'
					);
			}

			// Timeline line animation
			if (timelineRef.current) {
				gsap.from(timelineRef.current, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 70%',
						toggleActions: 'play none none reverse'
					},
					scaleY: 0,
					transformOrigin: 'top',
					duration: 1.2,
					ease: 'power2.inOut'
				});
			}

			// Animate timeline dots
			dotsRef.current.forEach((dot, index) => {
				if (dot) {
					gsap.from(dot, {
						scrollTrigger: {
							trigger: dot,
							start: 'top 85%',
							toggleActions: 'play none none reverse'
						},
						scale: 0,
						rotation: 180,
						duration: 0.6,
						delay: index * 0.1,
						ease: 'back.out(1.7)'
					});
				}
			});

			// Animate experience cards with advanced effects
			experiencesRef.current.forEach((exp, index) => {
				if (exp) {
					const isLeft = index % 2 === 0;
					const cardTl = gsap.timeline({
						scrollTrigger: {
							trigger: exp,
							start: 'top 80%',
							toggleActions: 'play none none reverse'
						}
					});

					// Card entrance
					cardTl.from(exp, {
						x: isLeft ? -100 : 100,
						y: 50,
						rotationY: isLeft ? -15 : 15,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out'
					});

					// Content stagger
					const content = exp.querySelector('.card-content');
					if (content) {
						const title = content.querySelector('h3');
						const company = content.querySelector('.company');
						const meta = content.querySelector('.meta');
						const tech = content.querySelector('.technologies');
						const list = content.querySelectorAll('li');

						if (title) cardTl.from(title, { y: 20, opacity: 0, duration: 0.4 }, '-=0.4');
						if (company) cardTl.from(company, { y: 15, opacity: 0, duration: 0.3 }, '-=0.3');
						if (meta) cardTl.from(meta.children, { y: 10, opacity: 0, stagger: 0.08, duration: 0.3 }, '-=0.2');
						if (tech)
							cardTl.from(
								tech.children,
								{ scale: 0, rotation: -180, stagger: 0.08, duration: 0.4, ease: 'back.out(1.7)' },
								'-=0.2'
							);
						if (list.length) cardTl.from(list, { x: 20, opacity: 0, stagger: 0.08, duration: 0.3 }, '-=0.3');
					}
				}
			});

			// Highlight box with morphing effect
			if (highlightRef.current) {
				const highlightTl = gsap.timeline({
					scrollTrigger: {
						trigger: highlightRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});

				highlightTl
					.from(highlightRef.current, {
						scale: 0.8,
						y: 60,
						borderRadius: '50%',
						duration: 0.8,
						ease: 'back.out(1.7)'
					})
					.from(
						highlightRef.current.querySelector('.highlight-content'),
						{
							opacity: 0,
							y: 30,
							duration: 0.6,
							ease: 'power2.out'
						},
						'-=0.4'
					);
			}

			// Add parallax effect to decorative elements
			const decoratives = sectionRef.current.querySelectorAll('.decorative');
			decoratives.forEach((el, index) => {
				gsap.to(el, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					},
					y: index % 2 === 0 ? -50 : 50,
					rotation: index % 2 === 0 ? 10 : -10,
					ease: 'none'
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const experiences = [
		{
			role: 'Junior React Developer',
			company: 'xDevelopers',
			location: 'Jaipur',
			period: 'Jan 2024 - Present',
			duration: '1 Year',
			current: true,
			icon: FiCode,
			color: 'from-blue-500 to-purple-600',
			technologies: ['React.js', 'Redux Toolkit', 'JavaScript', 'Tailwind CSS', 'Figma', 'GSAP'],
			responsibilities: [
				'Developing responsive web interfaces using React.js and modern JavaScript',
				'Implementing state management solutions using Redux and Redux Toolkit',
				'Collaborating on component design and bringing UI/UX perspective to development',
				'Writing clean, maintainable code following React best practices',
				'Continuously learning and adapting to team workflows and coding standards'
			]
		},
		{
			role: 'React Development Intern',
			company: 'xDevelopers',
			location: 'Jaipur',
			period: 'Sept 2024 - Dec 2024',
			duration: '4 months',
			current: false,
			icon: FiUser,
			color: 'from-green-500 to-teal-600',
			technologies: ['React.js', 'JavaScript', 'Figma', 'HTML/CSS', 'Git'],
			responsibilities: [
				'Learned React ecosystem including Hooks, Router, and state management',
				'Built responsive UI components from Figma designs',
				'Assisted in debugging and feature development',
				'Successfully converted to full-time junior developer role'
			]
		}
	];

	return (
		<section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" ref={sectionRef}>
			<div className="max-w-7xl mx-auto relative z-10">
				{/* Enhanced Header */}
				<div ref={headerRef} className="text-center mb-16 sm:mb-24">
					<div className="badge inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-800/50 rounded-full text-sm tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-6 backdrop-blur-sm">
						<FiBriefcase className="w-4 h-4" />
						Work Experience
						<FiTrendingUp className="w-4 h-4" />
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-6 font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
						Professional Journey
					</h2>
					<p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
						From UI/UX designer to React developer. A unique path that combines design thinking with modern web
						development, creating exceptional user experiences.
					</p>
				</div>

				{/* Timeline Container */}
				<div className="relative max-w-5xl mx-auto">
					{/* Timeline Line */}
					<div
						className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 h-full transform -translate-x-1/2 origin-top rounded-full shadow-lg"
						ref={timelineRef}
					></div>

					{/* Experiences */}
					<div className="space-y-16 sm:space-y-24">
						{experiences.map((exp, index) => {
							const IconComponent = exp.icon;
							const isLeft = index % 2 === 0;

							return (
								<div
									key={index}
									className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} w-full`}
									ref={el => (experiencesRef.current[index] = el)}
								>
									{/* Timeline Dot */}
									<div
										className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} shadow-xl border-4 border-white dark:border-slate-800 z-20`}
										ref={el => (dotsRef.current[index] = el)}
									>
										<div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
											<IconComponent className="w-3 h-3 text-slate-600 dark:text-slate-400" />
										</div>
									</div>

									{/* Experience Card */}
									<div
										className={`w-full max-w-xs sm:max-w-md md:max-w-lg ${isLeft ? 'mr-2 sm:mr-8' : 'ml-2 sm:ml-8'} transform transition-all duration-500 hover:scale-105`}
									>
										<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-500">
											<div className="card-content">
												{/* Header */}
												<div className="flex items-start justify-between mb-4">
													<div className="flex-1">
														<h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
															{exp.role}
														</h3>
														<div className="company text-lg text-slate-600 dark:text-slate-400 font-medium">
															{exp.company}
														</div>
													</div>
													{exp.current && (
														<span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs tracking-wider uppercase rounded-full font-semibold shadow-lg animate-pulse">
															Current
														</span>
													)}
												</div>

												{/* Meta Information */}
												<div className="meta flex flex-wrap gap-3 mb-6">
													<div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300">
														<FiCalendar className="w-4 h-4" />
														<span>{exp.period}</span>
														<span className="text-slate-400">•</span>
														<span className="font-semibold">{exp.duration}</span>
													</div>
													<div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300">
														<FiMapPin className="w-4 h-4" />
														<span>{exp.location}</span>
													</div>
												</div>

												{/* Technologies */}
												<div className="technologies flex flex-wrap gap-2 mb-4">
													{exp.technologies.map((tech, techIndex) => (
														<span
															key={techIndex}
															className="px-3 py-1.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-500 text-slate-700 dark:text-slate-200 text-xs rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 cursor-default"
														>
															{tech}
														</span>
													))}
												</div>

												{/* Responsibilities */}
												<ul className="space-y-2">
													{exp.responsibilities.map((resp, respIndex) => (
														<li
															key={respIndex}
															className="text-slate-600 dark:text-slate-400 text-sm flex gap-3 items-start"
														>
															<FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
															<span className="leading-relaxed">{resp}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Enhanced Career Highlight Box */}
				<div
					className="mt-20 sm:mt-28 p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white text-white dark:text-slate-900 rounded-3xl shadow-2xl shadow-slate-900/50 relative overflow-hidden"
					ref={highlightRef}
				>
					{/* Decorative elements */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-2xl"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-full blur-xl"></div>

					<div className="highlight-content relative z-10 text-center">
						<div className="text-2xl sm:text-3xl mb-4 flex items-center justify-center gap-3">
							<span>🚀</span>
							<span className="font-bold">My Unique Advantage</span>
							<span>💡</span>
						</div>
						<p className="text-white/90 dark:text-slate-700 leading-relaxed text-lg sm:text-xl max-w-4xl mx-auto">
							Coming from a UI/UX design background gives me a unique edge in development. I don't just build features—I
							understand user needs, design intuitive interfaces in Figma first, then implement them with clean,
							maintainable React code. This design-to-code workflow makes me a valuable team member who bridges the gap
							between design and engineering, resulting in products that are both beautiful and functional.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
