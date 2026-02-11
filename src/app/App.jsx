import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { Skills } from '@/app/components/Skills';
import { Projects } from '@/app/components/Projects';
import { Experience } from '@/app/components/Experience';
import { Certifications } from '@/app/components/Certifications';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';
import { ThemeProvider } from '@/app/components/ThemeProvider';

export default function App() {
	return (
		<ThemeProvider>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 antialiased selection:bg-indigo-600 selection:text-white dark:selection:bg-indigo-500 dark:selection:text-white transition-colors duration-300 scroll-smooth">
				<Header />
				<main>
					<section id="hero">
						<Hero />
					</section>
					<section id="work">
						<Projects />
					</section>
					<section id="skills">
						<Skills />
					</section>
					<section id="experience">
						<Experience />
					</section>
					<section id="certifications">
						<Certifications />
					</section>
					<section id="contact">
						<Contact />
					</section>
				</main>
				<Footer />
			</div>
		</ThemeProvider>
	);
}
