import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// [hero] staggered cinematic entrance — label arrives first, then name crashes in,
// bio follows, scroll indicator fades last. Slightly slow ease-out for weight.
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-label',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6 }
  )
  .fromTo('.hero-name',
    { opacity: 0, y: 60, skewY: 1.5 },
    { opacity: 1, y: 0, skewY: 0, duration: 1.0 },
    '-=0.2'
  )
  .fromTo('.hero-bio',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7 },
    '-=0.35'
  )
  .fromTo('.hero-scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    '-=0.1'
  );
}

// [about] scroll-triggered stagger — narrative arrives in sequence, samsung stat
// counts up on entry to give the number its moment, human note and volunteer
// callout follow at a slower, more contemplative pace.
export function animateAbout() {
  const defaults = { ease: 'power3.out' };

  gsap.fromTo('.about-label',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.6, ...defaults,
      scrollTrigger: { trigger: '.about-label', start: 'top 88%' } }
  );

  gsap.fromTo('.about-narrative p',
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ...defaults,
      scrollTrigger: { trigger: '.about-narrative', start: 'top 82%' } }
  );

  gsap.fromTo('.about-education',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ...defaults,
      scrollTrigger: { trigger: '.about-education', start: 'top 88%' } }
  );

  // Samsung stat — reveal the block then count up the number
  gsap.fromTo('.about-stat',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ...defaults,
      scrollTrigger: { trigger: '.about-stat', start: 'top 85%' } }
  );

  const statEl = document.querySelector<HTMLElement>('.about-stat-number');
  if (statEl) {
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 27,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { statEl.textContent = Math.round(counter.val).toString(); },
      scrollTrigger: { trigger: '.about-stat', start: 'top 85%' },
    });
  }

  gsap.fromTo('.about-human',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ...defaults,
      scrollTrigger: { trigger: '.about-human', start: 'top 88%' } }
  );

  gsap.fromTo('.about-volunteer',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, ...defaults,
      scrollTrigger: { trigger: '.about-volunteer', start: 'top 88%' } }
  );
}
