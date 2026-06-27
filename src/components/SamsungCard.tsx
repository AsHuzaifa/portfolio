// [samsung] Credential card — header is the anchor, stat supports it.
// Per-course accordion expands on click with a smooth height transition.
// Cursor-proximity glow on the card border (sage green).

import { useState, useEffect, useRef } from 'react';

interface Course {
  title: string;
  detail: string;
}

interface SamsungCardProps {
  context: string;
  stat: string;
  subtext: string;
  courses: Course[];
  variant?: 'card' | 'inline';
}

const GLOW_REST = '0 0 0 1px rgba(42,74,62,0.08)';

export default function SamsungCard({
  context,
  stat,
  subtext,
  courses,
  variant = 'card',
}: SamsungCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Cursor-proximity glow (card variant only)
  useEffect(() => {
    const card = cardRef.current;
    if (!card || variant !== 'card') return;

    card.style.transition = 'box-shadow 0.3s ease';
    card.style.boxShadow = GLOW_REST;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const t = Math.max(0, 1 - dist / maxDist);
      const blur = 6 + t * 18;
      const spread = 1 + t * 10;
      const opacity = (0.08 + t * 0.14).toFixed(2);
      card.style.boxShadow = `0 0 ${blur}px ${spread}px rgba(42,74,62,${opacity}), 0 0 0 1px rgba(42,74,62,${(parseFloat(opacity) + 0.06).toFixed(2)})`;
    };

    const onLeave = () => { card.style.boxShadow = GLOW_REST; };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [variant]);

  // Mobile: single compact line
  if (variant === 'inline') {
    return (
      <p className="text-muted text-xs font-body leading-relaxed">
        {context}
      </p>
    );
  }

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  // Desktop: full document card
  return (
    <div
      ref={cardRef}
      className="bg-bg border-l-2 border-accent border border-accent-alt/10 rounded-sm px-5 py-5"
    >
      {/* Header — dominant anchor of the card */}
      <p className="text-text/80 text-[0.62rem] font-body tracking-[0.22em] uppercase mb-1 leading-tight font-medium">
        Samsung Innovation Campus
      </p>

      {/* Stat — supporting, not dominant */}
      <p
        className="text-muted/60 font-display font-light leading-none tracking-[-0.02em] mb-0.5"
        style={{ fontSize: '1.15rem' }}
      >
        {stat}
      </p>

      {/* Subtext */}
      <p className="text-muted/40 text-[0.58rem] font-body tracking-[0.16em] uppercase mb-5">
        {subtext}
      </p>

      {/* Divider */}
      <hr className="border-muted/12 mb-4" />

      {/* Courses — each with accordion */}
      <ul>
        {courses.map((course, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={i} className="border-b border-muted/10 last:border-b-0">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-3 py-3 text-left group"
                aria-expanded={isOpen}
              >
                <span className="text-text/70 text-[0.65rem] font-body leading-snug font-medium
                                 group-hover:text-text/90 transition-colors duration-150">
                  {course.title}
                </span>
                {/* Chevron rotates on open */}
                <svg
                  className="shrink-0 mt-0.5 text-muted/30 group-hover:text-muted/60 transition-colors duration-150"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease, color 0.15s ease',
                  }}
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Accordion body — CSS max-height for smooth expand */}
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  transition: 'max-height 0.28s ease',
                }}
              >
                <p className="text-muted/60 text-[0.62rem] font-body leading-relaxed pb-4 pr-2">
                  {course.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
