import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// [cache-busting] Files in public/ keep a fixed URL, so browsers serve a cached
// copy after the file is replaced. A short content hash in the query string
// changes the URL whenever the file's contents change. Runs at build time only.
export function getAssetVersion(publicPath: string): string {
  const contents = readFileSync(join(process.cwd(), 'public', publicPath));
  return createHash('sha256').update(contents).digest('hex').slice(0, 8);
}
