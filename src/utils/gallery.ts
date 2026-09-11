interface GalleryPhoto {
  src: string;
  caption?: string;
}

// [gallery] Click-through carousel for project hardware photos - swaps the
// <img> src/caption on arrow click with a quick opacity dip rather than
// crossfading two stacked images, since only one photo is ever visible.
export function initGalleryCarousels() {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((root) => {
    const photos: GalleryPhoto[] = JSON.parse(root.dataset.gallery || '[]');
    if (photos.length <= 1) return;

    const imgEl = root.querySelector<HTMLImageElement>('[data-gallery-img]');
    const captionEl = root.querySelector<HTMLElement>('[data-gallery-caption]');
    const counterEl = root.querySelector<HTMLElement>('[data-gallery-counter]');
    const prevBtn = root.querySelector<HTMLButtonElement>('[data-gallery-prev]');
    const nextBtn = root.querySelector<HTMLButtonElement>('[data-gallery-next]');
    if (!imgEl) return;

    let index = 0;

    function show(nextIndex: number) {
      index = (nextIndex + photos.length) % photos.length;
      const photo = photos[index];

      imgEl!.style.opacity = '0';
      window.setTimeout(() => {
        imgEl!.src = photo.src;
        imgEl!.alt = photo.caption ?? '';
        if (captionEl) captionEl.textContent = photo.caption ?? '';
        if (counterEl) counterEl.textContent = `${index + 1} / ${photos.length}`;
        imgEl!.style.opacity = '1';
      }, 150);
    }

    prevBtn?.addEventListener('click', () => show(index - 1));
    nextBtn?.addEventListener('click', () => show(index + 1));
  });
}
