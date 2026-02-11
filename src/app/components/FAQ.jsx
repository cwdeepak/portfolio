import { FiPlus, FiMinus } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
	const [openIndex, setOpenIndex] = useState(0);
	const sectionRef = useRef(null);
	const faqsRef = useRef([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (sectionRef.current) {
				gsap.from(sectionRef.current.querySelector('.section-header'), {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 75%'
					},
					y: 50,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out'
				});
			}

			faqsRef.current.forEach((faq, index) => {
				if (faq) {
					gsap.from(faq, {
						scrollTrigger: {
							trigger: faq,
							start: 'top 85%'
						},
						y: 30,
						opacity: 0,
						duration: 0.6,
						delay: index * 0.1,
						ease: 'power2.out'
					});
				}
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const faqs = [
		{
			question: 'When are you available to start?',
			answer:
				"I'm available to start soon. My current role requires a 30-day notice period, but I can discuss an early release with my employer if needed. If there's urgency, I’ll try my best to shorten the notice period and join earlier. I’m eager to contribute and transition smoothly into the new role."
		},
		{
			question: 'Are you open to relocation?',
			answer:
				"Yes, I'm open to relocation for the right opportunity. While I prefer remote or hybrid roles for better flexibility, I’m willing to relocate if the position offers strong growth potential and aligns with my career goals as a React developer."
		},

		{
			question: 'Why are you leaving your current role?',
			answer:
				"I'm leaving my current role because I’m looking for better opportunities to grow. I want to work on more complex frontend projects, collaborate with experienced developers, and be part of a team where I can keep improving my skills as a React developer."
		}
	];

	return (
		<section
			ref={sectionRef}
			className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
		>
			{/* Decorative background */}
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-200/30 to-slate-300/30 dark:from-slate-800/20 dark:to-slate-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

			<div className="max-w-5xl mx-auto relative z-10">
				<div className="section-header mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-full text-[10px] sm:text-xs tracking-widest text-slate-600 dark:text-slate-400 uppercase mb-4">
						<span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
						Quick Answers
					</div>
					<h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white mb-4 font-medium">
						Frequently Asked Questions
					</h2>
					<p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
						Common questions recruiters ask. Saving you time during the initial screening.
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							ref={el => (faqsRef.current[index] = el)}
							className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
								openIndex === index
									? 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/80 shadow-lg shadow-slate-500/10'
									: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
							}`}
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="w-full px-6 py-5 flex items-start justify-between text-left group"
							>
								<span
									className={`text-lg font-medium pr-8 transition-colors ${
										openIndex === index
											? 'text-slate-900 dark:text-white'
											: 'text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300'
									}`}
								>
									{faq.question}
								</span>
								<span
									className={`flex-shrink-0 mt-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
										openIndex === index
											? 'bg-slate-900 dark:bg-white rotate-180'
											: 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
									}`}
								>
									{openIndex === index ? (
										<FiMinus className="w-4 h-4 text-white dark:text-slate-900" />
									) : (
										<FiPlus
											className={`w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300`}
										/>
									)}
								</span>
							</button>
							{openIndex === index && (
								<div className="px-6 pb-6 pt-0">
									<p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
