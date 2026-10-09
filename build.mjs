// Builds the static site into dist/. No dependencies: `node build.mjs`.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { page } from './src/layout.mjs';
import { site, blacklistedPaths } from './src/site.mjs';
import home from './src/pages/home.mjs';
import pricing from './src/pages/pricing.mjs';
import plans from './src/pages/plans.mjs';
import channels from './src/pages/channels.mjs';
import guides from './src/pages/guides.mjs';
import simple from './src/pages/simple.mjs';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await cp('public', out, { recursive: true });

// Cache-busting version from the CSS and JS contents.
const hash = createHash('sha1');
for (const f of ['public/css/site.css', 'public/js/site.js', 'public/favicon.svg']) hash.update(await readFile(f));
const version = hash.digest('hex').slice(0, 10);

const pages = [home(), pricing(), ...plans(), channels(), guides(), ...simple()];

// Never publish or link to a blacklisted URL.
const norm = (u) => (u.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/').toLowerCase();
const banned = new Set(blacklistedPaths.map(norm));
for (const p of pages) {
  if (banned.has(norm(p.path))) throw new Error(`Page path ${p.path} is on the blacklist`);
}

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Duplicate page path ${p.path}`);
  seen.add(p.path);
  const file = p.path.endsWith('.html') ? join(out, p.path) : join(out, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  const html = page(p).replaceAll('__V__', version);
  const ownUrls = [...html.matchAll(/(?:href|content)="(\/[^"]*)"/g), ...html.matchAll(new RegExp(`"${site.url.replace(/\./g, '\\.')}(\\/[^"]*)?"`, 'g'))];
  for (const [, href = '/'] of ownUrls) {
    if (banned.has(norm(href))) throw new Error(`${p.path} links to blacklisted URL ${href}`);
  }
  await writeFile(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod></url>`);
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages into ${out}/ (assets v=${version})`);
