import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tools } from '../src/data/tools.ts';
import { categories } from '../src/data/categories.ts';
import { originals } from '../src/data/originals.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve paths
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const render = (await import(pathToFileURL(toAbsolute('dist/server/entry-server.js')).href)).render;

// Determine all routes to pre-render
const routesToPrerender = [
  '/',
  '/about',
  '/originals',
  '/tools',
  '/categories',
];

for (const original of originals) {
  routesToPrerender.push(`/originals/${original.slug}`);
}

for (const tool of tools) {
  routesToPrerender.push(`/tools/${tool.slug}`);
}

for (const cat of categories) {
  routesToPrerender.push(`/categories/${cat.id}`);
}

(async () => {
  for (const url of routesToPrerender) {
    const helmetContext: any = {};
    const { html: appHtml } = await render(url, helmetContext);
    const { helmet } = helmetContext;

    let html = template.replace(`<!--app-html-->`, appHtml);

    if (helmet) {
      const seoHead = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `;
      html = html.replace(`<!--seo-head-->`, seoHead);
    }

    const filePath = url === '/' ? 'index.html' : `${url.replace(/^\//, '')}/index.html`;
    const absolutePath = toAbsolute(`dist/client/${filePath}`);

    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, html);

    console.log(`pre-rendered: ${url}`);
  }

  // Generate sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender.map(route => `
  <url>
    <loc>https://atomest.com${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

  fs.writeFileSync(toAbsolute('dist/client/sitemap.xml'), sitemap.trim());
  console.log('generated sitemap.xml');

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: https://atomest.com/sitemap.xml
`;
  fs.writeFileSync(toAbsolute('dist/client/robots.txt'), robots);
  console.log('generated robots.txt');

})();
