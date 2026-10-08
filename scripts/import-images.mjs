// Copies the images the site uses from the old WordPress media library into
// public/images/. Run once before WordPress is switched off:
//   node scripts/import-images.mjs
// (or run the "Import images from WordPress" GitHub Action).
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const source = process.env.WP_UPLOADS || 'https://mojo4k.uk/wp-content/uploads/';
const list = (await readFile(new URL('./images.txt', import.meta.url), 'utf8')).split('\n').map((l) => l.trim()).filter(Boolean);

let ok = 0, skipped = 0;
const failed = [];
for (const path of list) {
  const dest = join('public/images', path);
  try { await access(dest); skipped++; continue; } catch {}
  try {
    const res = await fetch(source + path, { headers: { 'User-Agent': 'Mozilla/5.0 (mojo4k image import)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    failed.push(`${path} (${e.message})`);
  }
}
console.log(`Imported ${ok}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) console.log('Failed:\n  ' + failed.join('\n  '));
