import { Suspense } from "react";
import { useParams } from "wouter";
import { Share2, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ProductLayout } from "@/components/product/ProductLayout";
import { products } from "@/data/products";
import { toolComponents } from "@/data/toolComponents";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo/SEO";
import { ToolContentLayout } from "@/components/seo/ToolContentLayout";
import { ToolAnalyticsWrapper } from "@/components/seo/ToolAnalyticsWrapper";
import { GoogleAd } from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/config/ads";
import NotFound from "@/pages/not-found";

function ToolSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-12 w-1/3" />
    </div>
  );
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const product = products.find(p => p.slug === slug);

  if (!product) return <NotFound />;

  const ProductComponent = toolComponents[slug];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied to clipboard!" });
  };

  const Icon = product.icon;

  // JSON-LD Schema Generation
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": product.name,
      "url": `https://atomest.com/tools/${slug}`,
      "description": product.metaDescription || product.description,
      "applicationCategory": "BrowserApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ];

  if (product.faqs && product.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": product.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://atomest.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://atomest.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://atomest.com/tools/${slug}`
      }
    ]
  });

  return (
    <ProductLayout product={product}>
      <SEO 
        title={product.seoTitle || `${product.name} - Free Online Tool by Atomest`}
        description={product.seoDescription || product.metaDescription || product.description}
        canonicalPath={`/tools/${slug}`}
        schema={schemas}
        templateTitle={false}
      />

      <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl relative z-10">
        {/* Product Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12 mt-8"
        >
          <div className="flex flex-col justify-center max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight-head leading-tight">{product.name}</h1>
            <p className="text-xl font-medium text-foreground/80 mt-3 hidden sm:block">{product.tagline}</p>
            <p className="text-muted-foreground text-[1.1rem] mt-2 hidden sm:block">{product.description}</p>
          </div>
          <div className="flex flex-col sm:hidden">
            <p className="text-xl font-medium text-foreground/80 mt-1 mb-2">{product.tagline}</p>
            <p className="text-muted-foreground mb-2">{product.description}</p>
          </div>
          
          <div className="flex gap-2 flex-shrink-0 mt-2 sm:mt-4">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 rounded-lg font-bold shadow-sm" data-testid="button-share">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2 rounded-lg font-bold shadow-sm" data-testid="button-copy-link">
              <LinkIcon className="h-4 w-4" /> Copy
            </Button>
          </div>
        </motion.div>

        {/* Product Core Utility */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-10 mb-16 shadow-2xl depth-floating"
        >
          {ProductComponent ? (
            <ToolAnalyticsWrapper toolName={product.slug} category={product.category}>
              <Suspense fallback={<ToolSkeleton />}>
                <ProductComponent />
              </Suspense>
            </ToolAnalyticsWrapper>
          ) : (
            <div className="text-center py-16 text-muted-foreground text-lg">
              Tool component not found.
            </div>
          )}
        </motion.div>

        <GoogleAd adSlot={AD_SLOTS.TOOL_CONTENT} className="w-full max-w-4xl mx-auto mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <ToolContentLayout tool={product} />
        </motion.div>
      </div>
    </ProductLayout>
  );
}
