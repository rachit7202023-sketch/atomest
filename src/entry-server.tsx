import React from "react";
import { prerender } from "react-dom/static";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./AppRouter";

export async function render(url: string, helmetContext: any) {
  const { prelude } = await prerender(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <Router ssrPath={url}>
          <AppRouter />
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  );

  const html = await new Response(prelude).text();
  return { html };
}
