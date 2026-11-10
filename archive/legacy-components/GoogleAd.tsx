// Deprecated GoogleAd component - Atomest V2 does not serve advertisements.
// Kept as a no-op placeholder for any legacy routes until full retirement.

interface GoogleAdProps {
  adSlot?: string;
  adFormat?: string;
  responsive?: boolean;
  className?: string;
}

export function GoogleAd(_props: GoogleAdProps) {
  return null;
}
