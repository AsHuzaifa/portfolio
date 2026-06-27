// [samsung] Credential card — document feel, not a widget.
// Desktop: sticky right-column card with terracotta left border.
// Mobile (variant="inline"): single condensed line in the text flow.
// Cursor-proximity glow on the card border (sage green).

import { useEffect, useRef } from 'react';

interface SamsungCardProps {
  context: string;
  stat: string;
  subtext: string;
  courses: string[];
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
      className="bg-bg border-l-2 border-accent border border-accent-alt/10 rounded-sm px-5 py-5"
    >
      {/* Header in small caps */}
      <p className="text-muted/50 text-[0.5rem] font-body tracking-[0.3em] uppercase mb-4 leading-tight">
        Samsung Innovation Campus
      </p>

      {/* Stat in large Fraunces */}
      <p
        className="font-display font-light text-text leading-none tracking-[-0.04em] mb-1"
        style={{ fontSize: '2.8rem' }}
      >
        {stat}
      </p>

      {/* Subtext */}
      <p className="text-muted/50 text-[0.6rem] font-body tracking-[0.18em] uppercase mb-5">
        {subtext}
      </p>

      {/* Divider */}
      <hr className="border-muted/12 mb-4" />

      {/* Courses */}
      <ul className="space-y-2.5">
        {courses.map((course, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-accent-alt/40 text-[0.55rem] mt-0.5 shrink-0" aria-hidden="true">
              —
            </span>
            <span className="text-muted/60 text-[0.62rem] font-body leading-snug">
              {course}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
