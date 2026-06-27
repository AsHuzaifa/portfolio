// [sketchbook] Book-like container with GSAP rotateY page-turn.
// Pages flip through a two-phase animation: current folds to edge (power2.in),
// next unfolds from edge (power2.out). Cursor-proximity glow on book border.

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SketchbookProps {
  images?: string[];
}

const DEFAULT_IMAGES = [
  '/assets/sketches/sketch-1.jpg',
  '/assets/sketches/sketch-2.jpg',
  '/assets/sketches/sketch-3.jpg',
  '/assets/sketches/sketch-4.jpg',
];

const BOOK_W = 300;
const BOOK_H = 380;
const SPINE_W = 20;

const GLOW_REST = '0 0 0 1px rgba(42,74,62,0.10)';

export default function Sketchbook({ images = DEFAULT_IMAGES }: SketchbookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bookRef = useRef<HTMLDivElement>(null);

  // Initialize: hide all pages except the first
  useEffect(() => {
    pageRefs.current.forEach((page, i) => {
      if (!page) return;
      gsap.set(page, {
        display: i === 0 ? 'flex' : 'none',
        rotateY: 0,
        transformOrigin: 'left center',
        transformPerspective: 1400,
      });
    });
  }, []);

  function turnTo(targetIndex: number) {
    if (isAnimating) return;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    if (targetIndex === currentIndex) return;

    const currentPage = pageRefs.current[currentIndex];
    const nextPage = pageRefs.current[targetIndex];
    if (!currentPage || !nextPage) return;

    const forward = targetIndex > currentIndex;
    setIsAnimating(true);

    // Phase 1: fold current page to the spine
    gsap.to(currentPage, {
      rotateY: forward ? -90 : 90,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(currentPage, { display: 'none', rotateY: 0 });

        // Prepare next page behind the spine
        gsap.set(nextPage, {
          display: 'flex',
          rotateY: forward ? 90 : -90,
        });

        // Phase 2: unfold next page out from the spine
        gsap.to(nextPage, {
          rotateY: 0,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            setCurrentIndex(targetIndex);
            setIsAnimating(false);
          },
        });
      },
    });
  }

  // Cursor-proximity glow on book border
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    book.style.transition = 'box-shadow 0.3s ease';
    book.style.boxShadow = GLOW_REST;

    const onMove = (e: MouseEvent) => {
      const rect = book.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const t = Math.max(0, 1 - dist / maxDist);
      const blur = 8 + t * 20;
      const spread = 2 + t * 16;
      const opacity = (0.10 + t * 0.16).toFixed(2);
      book.style.boxShadow = `0 0 ${blur}px ${spread}px rgba(42,74,62,${opacity}), 0 0 0 1px rgba(42,74,62,${(parseFloat(opacity) + 0.06).toFixed(2)})`;
    };

    const onLeave = () => { book.style.boxShadow = GLOW_REST; };

    book.addEventListener('mousemove', onMove);
    book.addEventListener('mouseleave', onLeave);
    return () => {
      book.removeEventListener('mousemove', onMove);
      book.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div>
      <p className="text-muted text-xs tracking-[0.2em] uppercase font-body mb-6">
        Sketchbook
      </p>

      <div
        ref={bookRef}
        className="relative overflow-hidden rounded-sm bg-surface"
        style={{ width: BOOK_W, height: BOOK_H }}
      >
        {/* Spine */}
        <div
          className="absolute top-0 left-0 bottom-0 z-10 bg-accent-alt"
          style={{ width: SPINE_W }}
        />

        {/* Page area */}
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { pageRefs.current[i] = el; }}
            className="absolute inset-0 items-center justify-center"
            style={{ display: i === 0 ? 'flex' : 'none' }}
          >
            {/* Placeholder — always present behind the image */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ paddingLeft: SPINE_W }}
            >
              <span className="text-muted/20 text-[0.6rem] font-body tracking-[0.25em] uppercase select-none">
                {i + 1} / {images.length}
              </span>
            </div>

            {/* Image — fades in when loaded, hides silently on error */}
            <img
              src={src}
              alt={`Sketch ${i + 1}`}
              className="absolute object-cover opacity-0 transition-opacity duration-300"
              style={{
                top: 0,
                left: SPINE_W,
                width: BOOK_W - SPINE_W,
                height: BOOK_H,
              }}
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.opacity = '1';
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}

        {/* Page counter */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          <span className="text-muted/30 text-[0.55rem] font-body tracking-[0.2em] uppercase tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Prev button */}
        <button
          onClick={() => turnTo(currentIndex - 1)}
          disabled={currentIndex === 0 || isAnimating}
          className="absolute left-7 top-1/2 -translate-y-1/2 z-20
                     text-muted/30 hover:text-muted/60 transition-colors duration-200
                     disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous sketch"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={() => turnTo(currentIndex + 1)}
          disabled={currentIndex === images.length - 1 || isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                     text-muted/30 hover:text-muted/60 transition-colors duration-200
                     disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next sketch"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => turnTo(i)}
              disabled={isAnimating}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-3 h-1 bg-accent-alt/50'
                  : 'w-1 h-1 bg-muted/20 hover:bg-muted/40'
              }`}
              aria-label={`Go to sketch ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
