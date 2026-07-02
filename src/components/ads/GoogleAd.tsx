import { useEffect, useRef } from "react";
import { ENABLE_ADS } from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  adSlot: string;
  adFormat?: string;
  responsive?: boolean;
  className?: string;
}

export function GoogleAd({ adSlot, adFormat = "auto", responsive = true, className = "" }: GoogleAdProps) {
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only attempt to initialize if ads are enabled and we're on the client
    if (ENABLE_ADS && !isLoaded.current && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  // If ads are disabled, do not render any ad containers (zero layout shift/blank spaces)
  if (!ENABLE_ADS) {
    return null;
  }

  return (
    <div className={`overflow-hidden flex justify-center items-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-1114023113121466"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
