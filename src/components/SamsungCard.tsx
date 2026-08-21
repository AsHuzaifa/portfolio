// [samsung] Credential card — header is the anchor, stat supports it.
// Courses are switched via an indexed pill selector (not a dropdown) that
// cross-fades a single detail panel, filling the card's full width.
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
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Desktop: full document card
  return (
    <div
      ref={cardRef}
      className="bg-bg border-l-2 border-accent border border-accent-alt/10 rounded-sm px-6 py-6"
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
      <p className="text-muted/40 text-[0.58rem] font-body tracking-[0.16em] uppercase mb-6">
        {subtext}
      </p>

      {/* Divider */}
      <hr className="border-muted/12 mb-5" />

      {/* Courses — indexed selector row switches the detail panel below, no dropdown */}
      <p className="text-muted/35 text-[0.56rem] font-body tracking-[0.2em] uppercase mb-3">
        Coursework
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {courses.map((course, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-pressed={isActive}
              className={`flex items-baseline gap-2 rounded-full px-3.5 py-2 text-left transition-all duration-200 border
                         ${isActive
                            ? 'bg-accent-alt/8 border-accent-alt/35'
                            : 'border-muted/15 hover:border-muted/30'}`}
            >
              <span className={`text-[0.56rem] font-body tracking-[0.05em] transition-colors duration-200
                                ${isActive ? 'text-accent-alt/70' : 'text-muted/35'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-[0.65rem] font-body leading-snug font-medium transition-colors duration-200
                                ${isActive ? 'text-text/85' : 'text-muted/55'}`}>
                {course.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — cross-fades between the active course, fills the full card width */}
      <div className="relative min-h-[4.5rem]">
        {courses.map((course, i) => (
          <p
            key={i}
            className={`text-muted/60 text-[0.68rem] font-body leading-relaxed transition-opacity duration-300
                       ${activeIndex === i ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
          >
            {course.detail}
          </p>
        ))}
      </div>
    </div>
  );
}
