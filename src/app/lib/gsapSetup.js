import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let initialized = false;

export function initGsap() {
	if (initialized) return;
	initialized = true;

	gsap.registerPlugin(ScrollTrigger);
	gsap.config({
		force3D: true,
		autoSleep: 60,
		nullTargetWarn: false
	});
	gsap.defaults({
		duration: 0.55,
		ease: 'power2.out',
		overwrite: 'auto'
	});

	ScrollTrigger.config({
		ignoreMobileResize: true,
		autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
	});

	gsap.ticker.lagSmoothing(500, 33);
}
