// [fluid-art] Builds a layered radial-gradient background string from a small
// palette. Two elliptical blobs per color, sized/positioned unevenly and with a
// tight falloff, so the layers read as marbled swirls rather than one smooth
// blend once combined with the moderate blur in ProjectsSection.astro.
const BLOBS = [
  { pos: '15% 20%', size: '65% 55%' },
  { pos: '85% 10%', size: '55% 70%' },
  { pos: '75% 90%', size: '60% 50%' },
  { pos: '10% 85%', size: '50% 60%' },
  { pos: '55% 45%', size: '45% 45%' },
  { pos: '95% 55%', size: '40% 55%' },
];

export function buildFluidBackground(colors: string[], seed = 0): string {
  const layers: string[] = [];
  let blobIndex = seed * 2;

  colors.forEach((color) => {
    for (let j = 0; j < 2; j++) {
      const blob = BLOBS[blobIndex % BLOBS.length];
      layers.push(`radial-gradient(ellipse ${blob.size} at ${blob.pos}, ${color} 0%, transparent 62%)`);
      blobIndex++;
    }
  });

  return layers.join(', ');
}
