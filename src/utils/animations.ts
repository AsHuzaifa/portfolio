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

// [about] scroll-triggered stagger — narrative arrives in sequence, Samsung credential,
// projects carousel, and sketchbook follow. Volunteer block closes the section.
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

  // Samsung credential card reveal
  gsap.fromTo('.about-samsung',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ...defaults,
      scrollTrigger: { trigger: '.about-samsung', start: 'top 85%' } }
  );

  gsap.fromTo('.about-human',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ...defaults,
      scrollTrigger: { trigger: '.about-human', start: 'top 88%' } }
  );

  // CardSwap and Sketchbook wrappers reveal on scroll
  gsap.fromTo('.about-projects',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, ...defaults,
      scrollTrigger: { trigger: '.about-projects', start: 'top 85%' } }
  );

  gsap.fromTo('.about-sketchbook',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ...defaults,
      scrollTrigger: { trigger: '.about-sketchbook', start: 'top 88%' } }
  );

  gsap.fromTo('.about-volunteer',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.6, ...defaults,
      scrollTrigger: { trigger: '.about-volunteer', start: 'top 88%' } }
  );
}

// [accordions] smooth height animation on any [data-accordion-trigger] button.
// GSAP height:'auto' measures and animates to the content's natural height.
// Chevron inside the button rotates 180deg open, returns to 0 closed.
export function initAccordions() {
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]');

  triggers.forEach((btn) => {
    const id = btn.dataset.accordionTrigger!;
    const content = document.querySelector<HTMLElement>(`[data-accordion-content="${id}"]`);
    if (!content) return;

    const chevron = btn.querySelector<SVGElement>('svg');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        gsap.to(content, { height: 0, duration: 0.35, ease: 'power2.inOut' });
        if (chevron) gsap.to(chevron, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        btn.setAttribute('aria-expanded', 'false');
      } else {
        gsap.to(content, { height: 'auto', duration: 0.35, ease: 'power2.inOut' });
        if (chevron) gsap.to(chevron, { rotation: 180, duration: 0.3, ease: 'power2.inOut' });
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
