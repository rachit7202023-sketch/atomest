import { useState } from 'react';

export function useShareCard() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateShareCard = async () => {
    try {
      setIsGenerating(true);
      // Dynamically import to avoid bloating the initial bundle size
      const { toPng } = await import('html-to-image');
      
      const node = document.getElementById('ripple-share-card');
      if (!node) throw new Error("Share card element not found");

      // Temporarily scale up for high-res capture, then scale back down
      const originalTransform = node.style.transform;
      node.style.transform = 'scale(1)';
      
      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      
      node.style.transform = originalTransform;

      // Use Web Share API if available (Mobile), else download
      if (navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'my-ripple.png', { type: 'image/png' });
          await navigator.share({
            title: 'My Ripple',
            text: 'I just mapped the true cost of my decision on Atomest Originals.',
            files: [file],
          });
          return;
        } catch (shareError: any) {
          if (shareError.name !== 'AbortError') {
            console.error("Error sharing:", shareError);
          }
        }
      }
      
      // Fallback: Download
      const link = document.createElement('a');
      link.download = 'my-ripple.png';
      link.href = dataUrl;
      link.click();
      
    } catch (error) {
      console.error("Failed to generate share card", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateShareCard, isGenerating };
}
