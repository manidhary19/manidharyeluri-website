import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { projects, technology } from '../src/data/portfolio.js';

// GitHub Pages has no server-side SPA rewrite. Each public route gets its
// own entry document, so direct visits and refreshes return HTTP 200.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const routes = ['about', 'projects', 'technology', 'gallery',
  ...projects.map(item => `projects/${item.slug}`),
  ...technology.map(item => `technology/${item.slug}`)];
for (const route of routes) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
}
await writeFile(new URL('../dist/.nojekyll', import.meta.url), '');
console.log(`Generated ${routes.length + 1} static page entries for GitHub Pages.`);
