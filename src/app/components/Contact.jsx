import {
	FiMail,
	FiGithub,
	FiLinkedin,
	FiDownload,
	FiArrowRight,
	FiCalendar,
	FiMapPin,
	FiMessageCircle
} from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
	const sectionRef = useRef(null);
	const headingRef = useRef(null);
	const infoRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading animation - set visibility first
			if (headingRef.current) {
				gsap.set(headingRef.current.children, { opacity: 1, y: 0 });
				gsap.from(headingRef.current.children, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 85%'
					},
					y: 40,
					opacity: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out'
				});
			}

			// Info cards animation - ensure visibility
			if (infoRef.current) {
				gsap.set(infoRef.current.children, { opacity: 1, y: 0, scale: 1 });
				gsap.from(infoRef.current.children, {
					scrollTrigger: {
						trigger: infoRef.current,
						start: 'top 95%'
					},
					y: 30,
					opacity: 0,
					scale: 0.98,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power2.out'
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="py-16 sm:py-24 md:py-32 pb-8 sm:pb-16 px-2 sm:px-4 md:px-6 text-slate-900 dark:text-white relative overflow-hidden"
		>
			<div className="max-w-7xl mx-auto relative z-10 w-full">
				{/* Header Section */}
				<div ref={headingRef} className="text-center mb-16 sm:mb-24">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full text-emerald-400 text-sm tracking-wider uppercase mb-8">
						<span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
						Currently Interviewing
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 sm:mb-8 leading-tight font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
						Let's create something <br className="hidden sm:block" />
						<span className="text-slate-600 dark:text-slate-300">beautiful together.</span>
					</h2>
					<p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
						Open to opportunities where I can grow as both a designer and developer. Remote or hybrid roles preferred.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
						<a
							href="https://wa.me/919782090483?text=Hi Deepak, I found your portfolio and would like to discuss an opportunity with you."
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold rounded-xl shadow-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto"
						>
							<FiMessageCircle className="w-5 h-5" />
							<span className="font-medium text-base sm:text-lg">Start Conversation</span>
							<FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</a>

						<a
							href="/resume.pdf"
							download
							className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 text-slate-900 dark:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
						>
							<FiDownload className="w-5 h-5 group-hover:animate-bounce" />
							<span className="font-medium text-base sm:text-lg">Download Resume</span>
						</a>
					</div>
				</div>

				{/* Info Grid */}
				<div
					ref={infoRef}
					className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-16"
				>
					<div className="group relative h-full">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-slate-600/20 dark:to-slate-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
						<div className="relative h-full p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300/50 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/60 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-slate-500/10 flex flex-col">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
								<FiMail className="w-6 h-6 text-slate-900 dark:text-white" />
							</div>
							<div className="flex-1 flex flex-col">
								<h4 className="text-sm tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3 font-semibold">
									Email
								</h4>
								<a
									href="mailto:codewithdeepak95@gmail.com"
									className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors text-lg font-medium leading-tight"
								>
									codewithdeepak95@gmail.com
								</a>
							</div>
						</div>
					</div>

					<div className="group relative h-full">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-slate-600/20 dark:to-slate-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
						<div className="relative h-full p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300/50 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/60 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-slate-500/10 flex flex-col">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
								<FiMapPin className="w-6 h-6 text-slate-900 dark:text-white" />
							</div>
							<div className="flex-1 flex flex-col">
								<h4 className="text-sm tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3 font-semibold">
									Location
								</h4>
								<p className="text-slate-700 dark:text-slate-200 text-lg font-medium leading-tight mb-2">
									Jaipur, Rajasthan
								</p>
								<p className="text-slate-500 dark:text-slate-500 text-sm">Open to Remote Work</p>
							</div>
						</div>
					</div>

					<div className="group relative h-full sm:col-span-2 lg:col-span-1">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-slate-600/20 dark:to-slate-800/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
						<div className="relative h-full p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-300/50 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/60 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-slate-500/10 flex flex-col">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
								<FiCalendar className="w-6 h-6 text-slate-900 dark:text-white" />
							</div>
							<div className="flex-1 flex flex-col">
								<h4 className="text-sm tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3 font-semibold">
									Availability
								</h4>
								<p className="text-slate-700 dark:text-slate-200 text-lg font-medium leading-tight mb-2">
									30-day Notice
								</p>
								<p className="text-slate-500 dark:text-slate-500 text-sm">Can negotiate earlier</p>
							</div>
						</div>
					</div>
				</div>

				{/* Social Links */}
				<div className="flex justify-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
					<a
						href="https://github.com/cwdeepak"
						target="_blank"
						rel="noopener noreferrer"
						className="w-12 h-12 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
					>
						<FiGithub className="w-5 h-5" />
					</a>
					<a
						href="https://www.linkedin.com/in/code-with-deepak"
						target="_blank"
						rel="noopener noreferrer"
						className="w-12 h-12 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-110"
					>
						<FiLinkedin className="w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
}
