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
			if (headerRef.current) {
				gsap.from(headerRef.current.children, {
					y: 28,
					opacity: 0,
					duration: 0.52,
					stagger: 0.08,
					scrollTrigger: {
						trigger: headerRef.current,
						start: 'top 82%',
						once: true
					}
				});
			}

			if (timelineRef.current) {
				gsap.from(timelineRef.current, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 72%',
						once: true
					},
					scaleY: 0,
					transformOrigin: 'top',
					duration: 0.6
				});
			}

			dotsRef.current.forEach((dot, index) => {
				if (!dot) return;
				gsap.from(dot, {
					scrollTrigger: { trigger: dot, start: 'top 88%', once: true },
					scale: 0,
					duration: 0.35,
					delay: index * 0.05
				});
			});

			experiencesRef.current.forEach((card, index) => {
				if (!card) return;
				const isDesktopLeft = index % 2 === 0;
				gsap.from(card, {
					scrollTrigger: { trigger: card, start: 'top 84%', once: true },
					x: isDesktopLeft ? -100 : 100,
					y: 24,
					opacity: 0,
					duration: 0.5
				});
			});

			if (highlightRef.current) {
				gsap.from(highlightRef.current, {
					scrollTrigger: { trigger: highlightRef.current, start: 'top 88%', once: true },
					y: 34,
					opacity: 0,
					duration: 0.52
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const experiences = [
		{
			role: 'Junior React Developer',
			company: 'xDevelopers',
			location: 'Jaipur',
			period: 'Jan 2024 - Present',
			duration: '1+ Year',
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
			period: 'Sep 2024 - Dec 2024',
			duration: '4 Months',
			current: false,
			icon: FiUser,
			color: 'from-green-500 to-teal-600',
			technologies: ['React.js', 'JavaScript', 'Figma', 'HTML/CSS', 'Git'],
			responsibilities: [
				'Learned React ecosystem including hooks, router, and state management',
				'Built responsive UI components from Figma designs',
				'Assisted in debugging and feature development',
				'Successfully converted to full-time junior developer role'
			]
		}
	];

	return (
		<section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-24" ref={sectionRef}>
			<div className="max-w-7xl mx-auto relative z-10">
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
						development to build clear, usable interfaces.
					</p>
				</div>

				<div className="relative max-w-5xl mx-auto">
					<div
						className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 h-full transform md:-translate-x-1/2 origin-top rounded-full shadow-lg"
						ref={timelineRef}
					/>

					<div className="space-y-16 sm:space-y-24">
						{experiences.map((exp, index) => {
							const IconComponent = exp.icon;
							const isLeft = index % 2 === 0;

							return (
								<div
									key={index}
									className={`relative flex items-center justify-start ${isLeft ? 'md:justify-start' : 'md:justify-end'} w-full`}
									ref={el => (experiencesRef.current[index] = el)}
								>
									<div
										className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} shadow-xl border-4 border-white dark:border-slate-800 z-20`}
										ref={el => (dotsRef.current[index] = el)}
									>
										<div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
											<IconComponent className="w-3 h-3 text-slate-600 dark:text-slate-400" />
										</div>
									</div>

									<div
										className={`w-full max-w-full sm:max-w-md md:max-w-lg ml-10 sm:ml-12 md:ml-0 ${isLeft ? 'md:mr-8' : 'md:ml-8'} transform transition-all duration-500 hover:scale-[1.02]`}
									>
										<div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 transition-all duration-500">
											<div className="card-content">
												<div className="flex items-start justify-between mb-4 gap-3">
													<div className="flex-1">
														<h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">{exp.role}</h3>
														<div className="company text-lg text-slate-600 dark:text-slate-400 font-medium">{exp.company}</div>
													</div>
													{exp.current && (
														<span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs tracking-wider uppercase rounded-full font-semibold shadow-lg animate-pulse">
															Current
														</span>
													)}
												</div>

												<div className="meta flex flex-wrap gap-3 mb-6">
													<div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300">
														<FiCalendar className="w-4 h-4" />
														<span>{exp.period}</span>
														<span className="text-slate-400">&bull;</span>
														<span className="font-semibold">{exp.duration}</span>
													</div>
													<div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-xl text-sm text-slate-600 dark:text-slate-300">
														<FiMapPin className="w-4 h-4" />
														<span>{exp.location}</span>
													</div>
												</div>

												<div className="technologies flex flex-wrap gap-2 mb-4">
													{exp.technologies.map((tech, techIndex) => (
														<span
															key={techIndex}
															className="px-3 py-1.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-500 text-slate-700 dark:text-slate-200 text-xs rounded-full font-medium shadow-sm transition-all duration-300"
														>
															{tech}
														</span>
													))}
												</div>

												<ul className="space-y-2">
													{exp.responsibilities.map((resp, respIndex) => (
														<li key={respIndex} className="text-slate-600 dark:text-slate-400 text-sm flex gap-3 items-start">
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

				<div
					className="mt-20 sm:mt-28 p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white text-white dark:text-slate-900 rounded-3xl shadow-2xl shadow-slate-900/50 relative overflow-hidden"
					ref={highlightRef}
				>
					<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full blur-2xl" />
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-full blur-xl" />

					<div className="highlight-content relative z-10 text-center">
						<div className="text-2xl sm:text-3xl mb-4 flex items-center justify-center gap-3">
							<span className="font-bold">My Unique Advantage</span>
						</div>
						<p className="text-white/90 dark:text-slate-700 leading-relaxed text-lg sm:text-xl max-w-4xl mx-auto">
							Coming from a UI/UX design background gives me a unique edge in development. I do not just build features - I
							understand user needs, design intuitive interfaces in Figma first, then implement them with clean,
							maintainable React code.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
