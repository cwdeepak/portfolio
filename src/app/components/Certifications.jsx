import { FiAward, FiExternalLink, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
	const sectionRef = useRef(null);
	const certsRef = useRef([]);
	const educationRef = useRef(null);
	const headerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (headerRef.current) {
				gsap.from(headerRef.current.children, {
					scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
					y: 30,
					opacity: 0,
					duration: 0.5,
					stagger: 0.08
				});
			}

			certsRef.current.forEach((cert, index) => {
				if (!cert) return;
				gsap.from(cert, {
					scrollTrigger: { trigger: cert, start: 'top 90%', once: true },
					y: 24,
					opacity: 0,
					scale: 0.96,
					duration: 0.46,
					delay: index * 0.04
				});
			});

			if (educationRef.current) {
				gsap.from(educationRef.current, {
					scrollTrigger: { trigger: educationRef.current, start: 'top 88%', once: true },
					y: 22,
					opacity: 0,
					duration: 0.45
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const certifications = [
		{
			title: 'UI/UX Design Professional Certification',
			issuer: 'ImagineXP',
			date: 'March 2020',
			year: 2020,
			credentialId: 'IXUIUX-2020-DS',
			link: '#',
			skills: ['UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'User Testing', 'Figma'],
			featured: true,
			description: 'Comprehensive 5-month program covering end-to-end product design'
		}
	];

	const sortedCertifications = [...certifications].sort((a, b) => b.year - a.year);

	return (
		<section id="certifications" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden scroll-mt-24" ref={sectionRef}>
			<div className="max-w-7xl mx-auto relative z-10">
				<div ref={headerRef} className="text-center mb-16 sm:mb-24">
					<div className="badge inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-200/50 dark:border-purple-800/50 rounded-full text-sm tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-6 backdrop-blur-sm">
						<FiAward className="w-4 h-4" />
						Certifications
						<FiBookOpen className="w-4 h-4" />
					</div>
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-6 font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
						Learning Journey
					</h2>
					<p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
						Continuous learning and professional development through certifications and practical projects.
					</p>
				</div>

				<div className="grid gap-6">
					{sortedCertifications.map((cert, index) => (
						<div
							key={index}
							ref={el => (certsRef.current[index] = el)}
							className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-slate-900 dark:border-white shadow-lg shadow-slate-500/10 transition-all duration-500"
						>
							<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
								<div className="w-14 h-14 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center flex-shrink-0">
									<FiAward className="w-6 h-6 text-white dark:text-slate-900" />
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between gap-4 mb-2">
										<div>
											<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1 flex flex-wrap items-center gap-2">
												{cert.title}
												<span className="text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1 rounded-full tracking-wider uppercase">
													Foundation
												</span>
											</h3>
											<div className="text-slate-600 dark:text-slate-400 font-medium">{cert.issuer}</div>
										</div>
										<a
											href={cert.link}
											className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
										>
											<FiExternalLink className="w-4 h-4" />
										</a>
									</div>

									<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{cert.description}</p>

									<div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
										<div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg">
											<FiCalendar className="w-4 h-4" />
											<span>{cert.date}</span>
										</div>
										<div className="text-xs tracking-wide uppercase">ID: {cert.credentialId}</div>
									</div>

									<div className="flex flex-wrap gap-2">
										{cert.skills.map((skill, skillIndex) => (
											<span
												key={skillIndex}
												className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-700/50 text-slate-700 dark:text-slate-300 text-xs rounded-lg font-medium"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div
					className="mt-12 p-6 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
					ref={educationRef}
				>
					<div className="flex items-start gap-4">
						<div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">Ed</div>
						<div>
							<h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Academic Background</h3>
							<div className="text-sm space-y-1">
								<p className="font-medium text-slate-700 dark:text-slate-300">Master of Commerce (M.Com) - 2018</p>
								<p className="text-slate-500 dark:text-slate-400">Computer Science in Higher Secondary - 2012</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
