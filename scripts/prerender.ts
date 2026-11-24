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

    // Helmet renders page-specific SEO tags into the DOM during prerendering
    // (inside #root). Extract them so we can move them into the document head
    // and strip them from the body to avoid duplicate/invalid tags.
    const appTitleMatch = appHtml.match(/<title>([\s\S]*?)<\/title>/);
    const appTitle = appTitleMatch ? appTitleMatch[1] : null;

    const appHtmlWithoutSeo = appHtml
      .replace(/<title[\s\S]*?<\/title>/gi, "")
      .replace(/<meta[^>]*(name="description"|property="og:"|name="twitter:")[^>]*\/?>/gi, "")
      .replace(/<link[^>]*rel="canonical"[^>]*\/?>/gi, "");

    html = template.replace("<!--app-html-->", appHtmlWithoutSeo);

    // Inject SEO metadata into the static head. Prefer page-specific Helmet
    // context data when available; fall back to the title extracted from the
    // prerendered DOM, then to sensible defaults.
    const defaultTitle = "Atomest | AI Automation Studio — Websites, Automation & AI";
    const defaultDescription = "Atomest helps businesses eliminate repetitive operations, capture more leads, and scale using AI-powered automation. Service-first AI automation studio for US, UK and international SMBs.";
    const canonicalUrl = `https://www.atomest.com${url === "/" ? "" : url}`;

    const helmetTitleStr = helmet && helmet.title ? helmet.title.toString() : "";
    const seoTitle = helmetTitleStr
      ? helmetTitleStr
      : appTitle
        ? `<title>${appTitle}</title>`
        : `<title>${defaultTitle}</title>`;

    const helmetMetaStr = helmet && helmet.meta ? helmet.meta.toString() : "";
    const seoMeta = helmetMetaStr
      ? helmetMetaStr
      : `
    <meta name="description" content="${defaultDescription}" />
    <meta property="og:title" content="${appTitle ?? defaultTitle}" />
    <meta property="og:description" content="${defaultDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${appTitle ?? defaultTitle}" />
    <meta name="twitter:description" content="${defaultDescription}" />
  `;

    const helmetLinkStr = helmet && helmet.link ? helmet.link.toString() : "";
    const seoLink = helmetLinkStr
      ? helmetLinkStr
      : `<link rel="canonical" href="${canonicalUrl}" />`;

    const helmetScriptStr = helmet && helmet.script ? helmet.script.toString() : "";

    html = html.replace(
      "<!--seo-head-->",
      `\n${seoTitle}\n${seoMeta}\n${seoLink}\n${helmetScriptStr}\n  `
    );

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
