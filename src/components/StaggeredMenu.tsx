import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NavItem {
  label: string;
  link: string;
  ariaLabel?: string;
}

interface Props {
  items?: NavItem[];
  position?: 'left' | 'right';
  isFixed?: boolean;
}

export const StaggeredMenu: React.FC<Props> = ({
  position = 'right',
  items = [],
  isFixed = false,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLElement>(null);

  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const textInnerRef = useRef<HTMLSpanElement>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  const TEXT_ITEMS = ['Menu', 'Close'] as const;

  // Portfolio palette constants
  const MUTED      = '#8C7E6E';
  const MUTED_OPEN = '#EDE7D9';
  const LAYERS     = ['#C94A2A', '#2A4A3E'];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: MUTED });
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));

    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity']: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart);
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;
    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    colorTweenRef.current = gsap.to(btn, {
      color: opening ? MUTED_OPEN : MUTED,
      delay: 0.18,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  // Two static items — yPercent: 0 shows "Menu", yPercent: -50 shows "Close".
  // Avoids React state-update race conditions that broke the previous cycling approach.
  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textAnimRef.current?.kill();
    textAnimRef.current = gsap.to(inner, {
      yPercent: opening ? -50 : 0,
      duration: opening ? 0.4 : 0.3,
      ease: opening ? 'power3.out' : 'power3.inOut',
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) { playOpen(); } else { playClose(); }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText]);

  // Close on click-away (outside panel and toggle button)
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, closeMenu]);

  return (
    <div className={`sm-scope z-50 ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`}>
      <div
        className="staggered-menu-wrapper relative w-full h-full pointer-events-none"
        data-position={position}
        data-open={open || undefined}
      >
        {/* Pre-layers */}
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
          {LAYERS.slice(0, 2).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
          ))}
        </div>

        {/* Header — toggle button only */}
        <header className="absolute top-0 left-0 w-full flex items-center justify-end px-8 md:px-20 lg:px-32 py-8 bg-transparent pointer-events-none z-20">
          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center gap-[0.5rem] bg-transparent border-0 cursor-pointer font-body font-light text-sm tracking-[0.12em] uppercase overflow-visible pointer-events-auto"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap">
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {TEXT_ITEMS.map((l, i) => (
                  <span className="block h-[1em] leading-none" key={i}>{l}</span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="relative w-[12px] h-[12px] shrink-0 inline-flex items-center justify-center" aria-hidden="true">
              <span ref={plusHRef} className="absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2" />
              <span ref={plusVRef} className="absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2" />
            </span>
          </button>
        </header>

        {/* Slide-in panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="sm-panel absolute top-0 right-0 h-full flex flex-col pt-32 pb-12 px-10 overflow-y-auto z-10 pointer-events-auto"
          aria-hidden={!open}
        >
          <nav>
            <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-1" role="list">
              {items.map((it, idx) => (
                <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                  <a
                    className="sm-panel-item relative font-display font-light text-[3.5rem] md:text-[4.5rem] leading-none tracking-[-0.02em] inline-block no-underline pr-[1.2em]"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    onClick={closeMenu}
                  >
                    <span className="sm-panel-itemLabel inline-block" style={{ transformOrigin: '50% 100%' }}>
                      {it.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <style>{`
        .sm-scope .sm-toggle { color: #8C7E6E; }
        .sm-scope .sm-toggle-textWrap { margin-right: 0.4em; }
        .sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
        .sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(280px, 40vw, 460px); pointer-events: none; z-index: 5; }
        .sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
        .sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; }
        .sm-scope .sm-panel { position: absolute; top: 0; right: 0; width: clamp(280px, 40vw, 460px); height: 100%; background: #EDE7D9; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; }
        .sm-scope [data-position='left'] .sm-panel { right: auto; left: 0; }
        .sm-scope .sm-panel-item { color: #1A1714; transition: color 0.2s ease; }
        .sm-scope .sm-panel-item:hover { color: #C94A2A; }
        @media (max-width: 640px) {
          .sm-scope .sm-prelayers,
          .sm-scope .sm-panel { width: 100%; left: 0; right: 0; }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
