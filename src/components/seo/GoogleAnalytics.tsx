import { useEffect } from "react";
import { useLocation } from "wouter";

// Declare global gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleAnalytics() {
  const [location] = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-BFJ0ZJMBTW";
  const isProduction = import.meta.env.PROD;

  // Track route changes on client-side
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (isProduction && typeof window !== "undefined" && window.gtag) {
      // Small timeout ensures the title/meta tags have updated before tracking
      timeoutId = setTimeout(() => {
        window.gtag("config", measurementId, {
          page_path: location,
        });
      }, 100);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location, isProduction, measurementId]);

  return null;
}
