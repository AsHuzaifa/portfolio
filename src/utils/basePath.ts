// import.meta.env.BASE_URL doesn't reliably include a trailing slash (observed
// as '/portfolio', not '/portfolio/', with base: '/portfolio' in astro.config.mjs),
// so anything concatenating onto it needs this normalized first.
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}
