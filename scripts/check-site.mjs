import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { projects, technology } from '../src/data/portfolio.js';

const base = process.env.SITE_URL || 'http://localhost:8080';
const routes = ['/', '/about', '/projects', '/technology', '/gallery',
  ...projects.map(p => `/projects/${p.slug}`), ...technology.map(p => `/technology/${p.slug}`)];
const assets = new Set([...projects, ...technology].flatMap(p => [p.cover, ...p.images]).map(n => `/assets/images/${n}`));
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await inspect(path);
    else if (/\.(jsx?|css)$/.test(path)) {
      const content = await readFile(path, 'utf8');
      for (const match of content.matchAll(/\/assets\/(?:images|fonts)\/[\w.-]+/g)) assets.add(match[0]);
      assert(!/made in framer|framer\.com\/|https?:\/\/framerusercontent/i.test(content), `Unexpected Framer branding/runtime asset in ${path}`);
    }
  }
}
await inspect('src');
for (const match of (await readFile('public/theme.css', 'utf8')).matchAll(/\/assets\/fonts\/[\w.-]+/g)) assets.add(match[0]);
for (const asset of assets) assert((await stat(`public${asset}`)).size > 0, `Empty asset: ${asset}`);
await Promise.all([...routes, ...assets].map(async path => {
  const response = await fetch(`${base}${path}`);
  assert(response.ok, `${path}: HTTP ${response.status}`);
  if (path.startsWith('/assets/')) assert(!response.headers.get('content-type')?.includes('text/html'), `Asset returned fallback HTML: ${path}`);
}));
console.log(`Passed: ${routes.length} routes, ${assets.size} local assets, no Framer branding or remote Framer runtime assets in source.`);
