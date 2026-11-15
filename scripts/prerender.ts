import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { prerender } from "react-dom/static";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";

// Vite normally injects `import.meta.env` at build time. In this Node/tsx
// prerender context it is undefined, so provide production defaults *before*
// importing any app code (some modules read env at module top level).
import.meta.env = import.meta.env ?? {
  PROD: true,
  DEV: false,
  BASE_URL: "/",
  VITE_GA_MEASUREMENT_ID: "G-BFJ0ZJMBTW",
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve paths relative to the repo root (scripts/ -> ..)
const toAbsolute = (p: string) => path.resolve(__dirname, "..", p);

// Template produced by the client build (vite build --outDir dist/client).
// It already references the hashed asset JS/CSS and keeps the <!--app-html-->
// and <!--seo-head--> comments that we fill in below.
const template = fs.readFileSync(toAbsolute("dist/client/index.html"), "utf-8");

// All approved public routes to pre-render as static HTML. Client-side routing
// (wouter + the vercel.json SPA rewrite) handles any route not listed here
// (e.g. /login, /dashboard, deep links) by falling back to index.html.
const routesToPrerender = [
  "/",
  "/services",
  "/services/ai-voice-receptionist",
  "/services/lead-automation",
  "/services/crm-workflow-automation",
  "/services/ai-customer-support",
  "/services/premium-business-websites",
  "/work",
  "/products",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/solutions/websites",
  "/solutions/automation",
  "/solutions/agents",
];

async function render(url: string, helmetContext: any, AppRouter: any) {
  const { prelude } = await prerender(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(HelmetProvider, { context: helmetContext },
        React.createElement(Router, { ssrPath: url },
          React.createElement(AppRouter)
        )
      )
    )
  );

  const html = await new Response(prelude as unknown as BodyInit).text();
  return { html };
}

(async () => {
  // Imported after import.meta.env is set above.
  const { default: AppRouter } = await import("@/AppRouter");

  for (const url of routesToPrerender) {
    const helmetContext: any = {};
    const { html: appHtml } = await render(url, helmetContext, AppRouter);
    const { helmet } = helmetContext;

    let html = template.replace("<!--app-html-->", appHtml);

    if (helmet) {
      const seoHead = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `;
      html = html.replace("<!--seo-head-->", seoHead);
    }

    const filePath =
      url === "/" ? "index.html" : `${url.replace(/^\//, "")}/index.html`;
    const absolutePath = toAbsolute(`dist/client/${filePath}`);

    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, html);

    console.log(`pre-rendered: ${url}`);
  }

  // Generate sitemap.xml
  const siteUrl = "https://www.atomest.com";
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route === "/" ? "" : route}</loc>
    <changefreq>${route === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(toAbsolute("dist/client/sitemap.xml"), sitemap);
  console.log("generated sitemap.xml");

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(toAbsolute("dist/client/robots.txt"), robots);
  console.log("generated robots.txt");
})();
