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
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const isProduction = import.meta.env.PROD;

  // Initialize Google Analytics
  useEffect(() => {
    if (!isProduction || !measurementId) return;

    // Check if script already exists to avoid duplication
    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = scriptSrc;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script2);
    }
  }, [isProduction, measurementId]);

  // Track route changes
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (isProduction && measurementId && window.gtag) {
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
