import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve paths
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const render = (await import(pathToFileURL(toAbsolute('dist/server/entry-server.js')).href)).render;

// Determine all approved V2 routes to pre-render
const routesToPrerender = [
  '/',
  '/services',
  '/work',
  '/about',
  '/contact',
  '/solutions/websites',
  '/solutions/automation',
  '/solutions/agents',
  '/solutions/products',
];

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
  const siteUrl = 'https://www.atomest.com';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(toAbsolute('dist/client/sitemap.xml'), sitemap);
  console.log('generated sitemap.xml');

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(toAbsolute('dist/client/robots.txt'), robots);
  console.log('generated robots.txt');
})();
