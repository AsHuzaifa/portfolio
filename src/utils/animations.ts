import gsap from 'gsap';

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
