/**
 * Google Analytics / GTAG initialization.
 *
 * Sets up window.dataLayer and a window.gtag wrapper that queues calls
 * until the external GTM script loads and replaces it. Loads the GTM
 * container script asynchronously.
 *
 * Called once from main.tsx in production. Page-route tracking is handled
 * separately by src/components/seo/GoogleAnalytics.tsx.
 */
export function initGtag(measurementId: string): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]): void {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
