import { useEffect, useRef } from 'react';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiTrendingUp, FiStar } from 'react-icons/fi';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p1 from '../../../public/p1.png';
import p2 from '../../../public/p2.png';
import p3 from '../../../public/p3.jpg';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const projectsRef = useRef([]);

	const projects = [
		{
			title: 'AI Q&A with Search Assistant',
			description:
				'Includes persistent recent-search history using localStorage, with per-item delete and clear-all options. Supports click-to-reuse previous queries and is built with modular, accessible components.',
			image: p1,
			tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'API'],
			github: 'https://github.com/cwdeepak/AI-Chat-app.git',
			demo: 'https://ai-chat-with-search.netlify.app/',
			color: 'from-blue-500 to-purple-600'
		},
		{
			title: 'Media Search & Collections',
			description:
				'Responsive app for searching media, previewing results, and curating into collections. Built with reusable components and Redux state management for fast, production-ready performance.',
			image: p2,
			tags: ['React', 'API', 'RTK', 'JavaScript (ES6+)'],
			github: 'https://github.com/cwdeepak/MediaSearch.git',
			demo: 'https://media-search-collection.netlify.app/',
			color: 'from-green-500 to-teal-600'
		},
		{
			title: 'Personal Portfolio',
			description:
				'A coding-first portfolio built with Vibe Coding. Features responsive layouts, semantic markup, and smooth GSAP animations for a polished, production-ready experience.',
			image: p3,
			tags: ['React', 'Tailwind', 'Vibe Coding', 'GSAP'],
			github: 'https://github.com/cwdeepak/portfolio.git',
			demo: '#',
			color: 'from-pink-500 to-orange-600'
		}
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			const cards = projectsRef.current.filter(Boolean);
			const isMobile = window.matchMedia('(max-width: 767px)').matches;
			const yOffset = isMobile ? 20 : 34;

			// Keep content visible by default; animate only when section enters.
			gsap.set(cards, { opacity: 1, y: 0 });
			if (headerRef.current) gsap.set(headerRef.current.children, { opacity: 1, y: 0 });

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'top 80%',
				once: true,
				onEnter: () => {
					if (headerRef.current) {
						gsap.from(headerRef.current.children, {
							y: 26,
							opacity: 0,
							duration: 0.5,
							stagger: 0.08
						});
					}

					gsap.from(cards, {
						y: yOffset,
						opacity: 0,
						duration: isMobile ? 0.42 : 0.5,
						stagger: isMobile ? 0.08 : 0.1
					});
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="work"
			className="py-16 sm:py-24 md:py-32 px-3 sm:px-4 md:px-6 relative overflow-hidden scroll-mt-24"
			ref={sectionRef}
		>
			<div className="max-w-7xl mx-auto relative z-10 w-full">
				{/* Enhanced Header */}
				<div ref={headerRef} className="text-center mb-16 sm:mb-24">
					<div className="badge inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-800/50 rounded-full text-sm tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-6 backdrop-blur-sm">
						<FiStar className="w-4 h-4" />
						Case Studies
						<FiTrendingUp className="w-4 h-4" />
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-6 font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
						Curated Work
					</h2>
					<p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
						A collection of projects that showcase my journey from design to development, each telling a unique story of
						problem-solving and innovation.
					</p>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 md:gap-10 pb-2 sm:pb-0">
					{projects.map((project, index) => {
						return (
							<div
								key={index}
								className="group relative mx-1 sm:mx-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-500 overflow-hidden cursor-pointer"
								ref={el => (projectsRef.current[index] = el)}
							>
								{/* Project Image */}
								<div className="project-image relative aspect-[4/3] overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[240px]">
									<ImageWithFallback
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-xl"
									/>
									<div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>
								</div>

								{/* Project Content */}
								<div className="project-content p-4 sm:p-6 md:p-8">
									<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{project.title}
									</h3>

									<p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3">
										{project.description}
									</p>

									{/* Tags */}
									<div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
										{project.tags.map((tag, tagIndex) => (
											<span
												key={tagIndex}
												className="tag px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Links */}
									<div className="project-links flex flex-col sm:flex-row gap-2 sm:gap-3">
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-105"
										>
											<FiGithub className="w-4 h-4" />
											Code
										</a>
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
										>
											<FiExternalLink className="w-4 h-4" />
											Live Demo
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-12 sm:mt-20 md:mt-32">
					<a
						href="https://github.com/cwdeepak"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl cursor-pointer"
					>
						<span>View All Projects</span>
						<FiArrowUpRight className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
}
