import { FaReact, FaJs, FaCss3Alt, FaHtml5, FaFigma, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux, SiAdobexd, SiReactrouter } from 'react-icons/si';
import { FiZap } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
	const sectionRef = useRef(null);
	const skillsRef = useRef([]);
	const headerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (headerRef.current) {
				gsap.from(headerRef.current.children, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 82%',
						once: true
					},
					y: 24,
					opacity: 0,
					duration: 0.5,
					stagger: 0.08
				});
			}

			skillsRef.current.forEach((skill, index) => {
				if (!skill) return;
				gsap.from(skill, {
					scrollTrigger: {
						trigger: skill,
						start: 'top 90%',
						once: true
					},
					y: 20,
					opacity: 0,
					scale: 0.94,
					duration: 0.42,
					delay: index * 0.04
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const skills = [
		{ icon: FaReact, name: 'React', color: 'text-blue-500' },
		{ icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-500' },
		{ icon: FaJs, name: 'JavaScript', color: 'text-yellow-500' },
		{ icon: FaHtml5, name: 'HTML5', color: 'text-orange-500' },
		{ icon: FaCss3Alt, name: 'CSS3', color: 'text-blue-500' },
		{ icon: SiReactrouter, name: 'React Router', color: 'text-red-500' },
		{ icon: SiRedux, name: 'Redux', color: 'text-purple-500' },
		{ icon: FaFigma, name: 'Figma', color: 'text-purple-400' },
		{ icon: SiAdobexd, name: 'Adobe XD', color: 'text-pink-500' },
		{ icon: FaGithub, name: 'GitHub', color: 'text-gray-800 dark:text-white' }
	];

	const learningSkills = [
		{ icon: SiNextdotjs, name: 'Next.js', color: 'text-black dark:text-white' },
		{ icon: SiTypescript, name: 'TypeScript', color: 'text-blue-600' }
	];

	return (
		<section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-24" ref={sectionRef}>
			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center mb-16 sm:mb-24" ref={headerRef}>
					<div className="badge inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 dark:from-green-500/20 dark:to-teal-500/20 border border-green-200/50 dark:border-green-800/50 rounded-full text-sm tracking-widest text-green-600 dark:text-green-400 uppercase mb-6 backdrop-blur-sm">
						<FiZap className="w-4 h-4" />
						Skills & Tools
						<FiZap className="w-4 h-4" />
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-6 font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
						The Secret Sauce
					</h2>
					<p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
						Technologies and tools I use to bring ideas to life, from design to deployment
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
					{skills.map((skill, index) => (
						<div
							key={index}
							className="group flex flex-col items-center text-center"
							ref={el => (skillsRef.current[index] = el)}
						>
							<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center mb-2 sm:mb-3 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white dark:hover:bg-slate-700">
								<skill.icon className={`w-8 h-8 ${skill.color}`} />
							</div>
							<span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
						</div>
					))}
				</div>

				{/* Currently Learning Section */}
				<div className="text-center mt-8">
					<h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-8">Currently Learning</h3>
					<div className="flex flex-wrap justify-center gap-6 sm:gap-8">
						{learningSkills.map((skill, index) => (
							<div key={index} className="group flex flex-col items-center text-center">
								<div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 backdrop-blur-sm flex items-center justify-center mb-2 sm:mb-3 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-dashed border-slate-400 dark:border-slate-500">
									<skill.icon className={`w-8 h-8 ${skill.color}`} />
								</div>
								<span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
								<span className="text-xs text-slate-500 dark:text-slate-400 mt-1">In Progress</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
