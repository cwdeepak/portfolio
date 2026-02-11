import { FiAward, FiExternalLink, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { IoSchoolOutline } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Certifications() {
	const sectionRef = useRef(null);
	const certsRef = useRef([]);
	const educationRef = useRef(null);
	const learningRef = useRef(null);
	const headerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate header with stagger
			if (headerRef.current) {
				gsap.from(headerRef.current.children, {
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%'
					},
					y: 60,
					opacity: 0,
					duration: 1,
					stagger: 0.1,
					ease: 'power4.out'
				});
			}

			// Animate certification cards with staggered pop-in
			certsRef.current.forEach((cert, index) => {
				if (cert) {
					gsap.from(cert, {
						scrollTrigger: {
							trigger: cert,
							start: 'top 90%'
						},
						y: 60,
						opacity: 0,
						scale: 0.9,
						rotationY: -10,
						duration: 0.8,
						delay: index * 0.1,
						ease: 'back.out(1.4)'
					});
				}
			});

			// Animate education box with slide
			if (educationRef.current) {
				gsap.from(educationRef.current, {
					scrollTrigger: {
						trigger: educationRef.current,
						start: 'top 85%'
					},
					x: -60,
					opacity: 0,
					duration: 0.9,
					ease: 'power3.out'
				});
			}

			// Animate currently learning box
			if (learningRef.current) {
				gsap.from(learningRef.current, {
					scrollTrigger: {
						trigger: learningRef.current,
						start: 'top 85%'
					},
					x: 60,
					opacity: 0,
					duration: 0.9,
					ease: 'power3.out'
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

	// Sort by year (oldest first)
	const sortedCertifications = [...certifications].sort((b, a) => a.year - b.year);

	return (
		<section id="certifications" className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden" ref={sectionRef}>
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
						Continuous learning and professional development through recognized certifications and courses
					</p>
				</div>

				<div className="grid gap-6">
					{sortedCertifications.map((cert, index) => (
						<div
							key={index}
							ref={el => (certsRef.current[index] = el)}
							className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10 hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-500 hover:scale-[1.02] ${
								cert.featured
									? 'border-2 border-slate-900 dark:border-white shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20'
									: cert.current
										? 'border-2 border-dashed border-slate-400 dark:border-slate-500'
										: 'border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-slate-500/10'
							}`}
						>
							<div className="flex items-start gap-4">
								<div
									className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
										cert.featured
											? 'bg-slate-900 dark:bg-white'
											: cert.current
												? 'bg-slate-700 dark:bg-slate-300'
												: 'bg-slate-100 dark:bg-slate-800'
									}`}
								>
									{cert.current ? (
										<FiBookOpen className="w-6 h-6 text-white dark:text-neutral-900" />
									) : (
										<FiAward
											className={`w-6 h-6 ${cert.featured ? 'text-white dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-400'}`}
										/>
									)}
								</div>

								<div className="flex-1">
									<div className="flex items-start justify-between gap-4 mb-2">
										<div>
											<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
												{cert.title}
												{cert.featured && (
													<span className="text-xs bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-1 rounded-full tracking-wider uppercase">
														Foundation
													</span>
												)}
												{cert.current && (
													<span className="text-xs bg-neutral-700 dark:bg-neutral-300 text-white dark:text-neutral-900 px-3 py-1 rounded-full tracking-wider uppercase">
														In Progress
													</span>
												)}
											</h3>
											<div className="text-neutral-600 dark:text-neutral-400 font-medium">{cert.issuer}</div>
										</div>
										{index !== 0 && (
											<a
												href={cert.link}
												className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
											>
												<FiExternalLink className="w-4 h-4" />
											</a>
										)}
									</div>

									{cert.description && (
										<p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{cert.description}</p>
									)}

									<div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-neutral-500 dark:text-neutral-500">
										<div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg">
											<FiCalendar className="w-4 h-4 text-neutral-500" />
											<span>{cert.date}</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-2">
										{cert.skills.map((skill, skillIndex) => (
											<span
												key={skillIndex}
												className="px-3 py-1.5 bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-800/50 text-neutral-700 dark:text-neutral-300 text-xs rounded-lg font-medium"
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

				{/* Education Background */}
				<div
					className="mt-12 p-6 bg-white dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
					ref={educationRef}
				>
					<div className="flex items-start gap-4">
						<div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl">
							🎓
						</div>
						<div>
							<h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Academic Background</h3>
							<div className="text-sm space-y-1">
								<p className="font-medium text-neutral-700 dark:text-neutral-300">Master of Commerce (M.Com) • 2018</p>
								<p className="text-neutral-500 dark:text-neutral-400">Computer Science in Higher Secondary • 2012</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
