// [cardswap] GSAP elastic stacked card swap - click any back card to bring it front.
// No auto-cycling. Cursor-proximity glow follows mouse within each card.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CardData {
  name: string;
  description: string;
}

interface CardSwapProps {
  cards: CardData[];
  cardWidth?: number;
  cardHeight?: number;
  cardDistance?: number;
  verticalDistance?: number;
  easing?: string;
}

const GLOW_REST = '0 0 0 1px rgba(42,74,62,0.10)';
// Extra padding around the container so box-shadow glow renders without clipping
const GLOW_PAD = 40;

function computeGlow(x: number, y: number, w: number, h: number): string {
  // Proximity to center - glow intensifies as cursor approaches card center
  const cx = w / 2;
  const cy = h / 2;
  const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
  const t = Math.max(0, 1 - dist / maxDist);
  const spread = 4 + t * 20;
  const blur = 8 + t * 20;
  const opacity = (0.10 + t * 0.18).toFixed(2);
  const borderOpacity = (0.12 + t * 0.14).toFixed(2);
  return `0 0 ${blur}px ${spread}px rgba(42,74,62,${opacity}), 0 0 0 1px rgba(42,74,62,${borderOpacity})`;
}

export default function CardSwap({
  cards,
  cardWidth = 335,
  cardHeight = 224,
  cardDistance = 32,
  verticalDistance = 32,
  easing = 'elastic.out(0.6, 0.9)',
}: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement[]>([]);
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEls = Array.from(
      container.querySelectorAll<HTMLDivElement>('.swap-card')
    );
    orderRef.current = [...cardEls];

    // Place cards at their stack positions - no animation on init
    cardEls.forEach((card, i) => {
      gsap.set(card, {
        x: i * cardDistance,
        y: i * verticalDistance,
        z: -i * 60,
        zIndex: cardEls.length - i,
        transformOrigin: 'center center',
        transformPerspective: 1000,
      });
    });

    function placeCards(ordered: HTMLDivElement[]) {
      ordered.forEach((card, i) => {
        gsap.to(card, {
          x: i * cardDistance,
          y: i * verticalDistance,
          z: -i * 60,
          zIndex: ordered.length - i,
          duration: 1.2,
          ease: easing,
          overwrite: true,
        });
      });
    }

    // Click: bring clicked card to front
    const clickHandlers = new Map<HTMLDivElement, () => void>();
    cardEls.forEach((card) => {
      const handler = () => {
        const idx = orderRef.current.indexOf(card);
        if (idx <= 0) return;
        orderRef.current.splice(idx, 1);
        orderRef.current.unshift(card);
        placeCards(orderRef.current);
      };
      card.addEventListener('click', handler);
      clickHandlers.set(card, handler);
    });

    // Arrows: cycle the whole stack one step forward/backward
    const cycleNext = () => {
      const [front, ...rest] = orderRef.current;
      orderRef.current = [...rest, front];
      placeCards(orderRef.current);
    };
    const cyclePrev = () => {
      const back = orderRef.current[orderRef.current.length - 1];
      orderRef.current = [back, ...orderRef.current.slice(0, -1)];
      placeCards(orderRef.current);
    };
    nextArrowRef.current?.addEventListener('click', cycleNext);
    prevArrowRef.current?.addEventListener('click', cyclePrev);

    // Cursor-proximity glow
    const glowHandlers = new Map<HTMLDivElement, { move: (e: MouseEvent) => void; leave: () => void }>();
    cardEls.forEach((card) => {
      card.style.transition = 'box-shadow 0.3s ease';
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.boxShadow = computeGlow(
          e.clientX - rect.left,
          e.clientY - rect.top,
          rect.width,
          rect.height
        );
      };
      const leave = () => { card.style.boxShadow = GLOW_REST; };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      glowHandlers.set(card, { move, leave });
    });

    return () => {
      clickHandlers.forEach((handler, card) => card.removeEventListener('click', handler));
      glowHandlers.forEach(({ move, leave }, card) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
      nextArrowRef.current?.removeEventListener('click', cycleNext);
      prevArrowRef.current?.removeEventListener('click', cyclePrev);
    };
  }, []);

  const containerW = cardWidth + (cards.length - 1) * cardDistance;
  const containerH = cardHeight + (cards.length - 1) * verticalDistance;

  return (
    // Outer wrapper provides padding so box-shadow glow is not clipped by parent overflow
    <div style={{
      padding: GLOW_PAD,
      margin: -GLOW_PAD,
      display: 'inline-block',
      position: 'relative',
    }}>
      <div
        ref={containerRef}
        className="relative"
        style={{ width: containerW, height: containerH, perspective: '1000px' }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="swap-card absolute cursor-pointer select-none
                       bg-surface border border-accent-alt/10 rounded-sm"
            style={{
              width: cardWidth,
              height: cardHeight,
              boxShadow: GLOW_REST,
            }}
          >
            <div className="h-full flex flex-col px-6 py-5">
              <p className="text-accent text-[0.54rem] font-body tracking-[0.28em] uppercase mb-3">
                Field work
              </p>
              <p className="text-text text-[0.94rem] font-body font-medium leading-snug mb-3">
                {card.name}
              </p>
              <p className="text-muted text-[0.77rem] font-body leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cycle hint: the offset back cards are clickable, not decorative */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          ref={prevArrowRef}
          type="button"
          aria-label="Show previous card"
          className="p-1.5 text-muted/40 hover:text-accent-alt transition-colors duration-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L3 6L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          ref={nextArrowRef}
          type="button"
          aria-label="Show next card"
          className="p-1.5 text-muted/40 hover:text-accent-alt transition-colors duration-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L9 6L4 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
