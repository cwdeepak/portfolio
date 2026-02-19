import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
	const sectionRef = useRef(null);
	const principlesRef = useRef([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate section header
			if (sectionRef.current) {
				gsap.from(sectionRef.current.querySelector('.section-header'), {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 75%',
						end: 'top 25%',
						toggleActions: 'play none none reverse'
					},
					y: 50,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out'
				});
			}

			// Animate each principle card
			principlesRef.current.forEach((principle, index) => {
				if (principle) {
					gsap.from(principle, {
						scrollTrigger: {
							trigger: principle,
							start: 'top 85%',
							end: 'top 35%',
							toggleActions: 'play none none reverse'
						},
						y: 40,
						opacity: 0,
						duration: 0.7,
						delay: index * 0.1,
						ease: 'power2.out'
					});
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const principles = [
		{
			num: '01',
			title: 'Design First',
			desc: 'Every project starts in Figma. I believe great interfaces are designed, not coded into existence.'
		},
		{
			num: '02',
			title: 'User Focused',
			desc: 'Coming from UI/UX, I always ask: "Will users understand this?" before "Can I build this?"'
		},
		{
			num: '03',
			title: 'Clean Code',
			desc: 'I write component-based, reusable code that other developers can understand and maintain.'
		},
		{
			num: '04',
			title: 'Keep Learning',
			desc: 'I actively learn emerging tools and technologies to enhance my skills and elevate the quality of my work.'
		}
	];

	return (
		<section
			className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden"
			ref={sectionRef}
		>
			{/* Decorative background */}
			<div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-slate-200/30 to-transparent dark:from-slate-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-full text-[10px] sm:text-xs tracking-widest text-slate-600 dark:text-slate-400 uppercase mb-8 sm:mb-12 section-header">
					<span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
					My Approach
				</div>

				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
					{principles.map((principle, i) => (
						<div
							key={i}
							className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/10"
							ref={el => (principlesRef.current[i] = el)}
						>
							<div className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-200 dark:text-slate-700 mb-2 sm:mb-3 md:mb-4 select-none group-hover:text-slate-300 dark:group-hover:text-slate-600 transition-all duration-300">
								{principle.num}
							</div>
							<h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2 md:mb-3">
								{principle.title}
							</h3>
							<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{principle.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
