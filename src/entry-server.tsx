import React from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./AppRouter";

export function render(url: string, helmetContext: any) {
  const { hook } = memoryLocation({ path: url, static: true });

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <Router hook={hook}>
          <AppRouter />
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  );
  return { html };
}
