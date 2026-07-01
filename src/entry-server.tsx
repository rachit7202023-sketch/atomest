import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./AppRouter";

export function render(url: string, helmetContext: any) {
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <Router ssrPath={url}>
          <AppRouter />
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  );
  return { html };
}
