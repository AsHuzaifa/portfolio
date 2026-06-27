// [cardswap] GSAP elastic stacked card swap — ReactBits pattern.
// Cards cycle on a timer; click any card to bring it front; pause on hover.
// Cursor-proximity glow follows mouse position within each card.

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
  delay?: number;
  pauseOnHover?: boolean;
  easing?: string;
}

const GLOW_REST = '0 0 0 1px rgba(42,74,62,0.10)';

function computeGlow(x: number, y: number, w: number, h: number): string {
  // Proximity to center — glow intensifies as cursor approaches card center
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
  cardWidth = 270,
  cardHeight = 180,
  cardDistance = 32,
  verticalDistance = 32,
  delay = 5000,
  pauseOnHover = true,
  easing = 'elastic.out(0.6, 0.9)',
}: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement[]>([]);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEls = Array.from(
      container.querySelectorAll<HTMLDivElement>('.swap-card')
    );
    orderRef.current = [...cardEls];

    // Place cards at their stack positions — no animation on init
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

    function cycle() {
      if (pausedRef.current) return;
      const first = orderRef.current.shift()!;
      orderRef.current.push(first);
      placeCards(orderRef.current);
    }

    timerRef.current = setInterval(cycle, delay);

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

    // Hover pause
    const enterPause = () => { pausedRef.current = true; };
    const leavePause = () => { pausedRef.current = false; };
    if (pauseOnHover) {
      container.addEventListener('mouseenter', enterPause);
      container.addEventListener('mouseleave', leavePause);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clickHandlers.forEach((handler, card) => card.removeEventListener('click', handler));
      glowHandlers.forEach(({ move, leave }, card) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', enterPause);
        container.removeEventListener('mouseleave', leavePause);
      }
    };
  }, []);

  const containerW = cardWidth + (cards.length - 1) * cardDistance;
  const containerH = cardHeight + (cards.length - 1) * verticalDistance;

  return (
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
          <div className="h-full flex flex-col px-5 py-4">
            <p className="text-accent text-[0.5rem] font-body tracking-[0.28em] uppercase mb-3">
              Field work
            </p>
            <p className="text-text text-sm font-body font-medium leading-snug mb-2">
              {card.name}
            </p>
            <p className="text-muted text-[0.7rem] font-body leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
