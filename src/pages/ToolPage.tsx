import { Suspense } from "react";
import { useParams } from "wouter";
import { Share2, Link as LinkIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { tools } from "@/data/tools";
import { toolComponents } from "@/data/toolComponents";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo/SEO";
import { ToolContentLayout } from "@/components/seo/ToolContentLayout";
import NotFound from "@/pages/not-found";

function ToolSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-10 w-1/3" />
    </div>
  );
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const tool = tools.find(t => t.slug === slug);

  if (!tool) return <NotFound />;

  const ToolComponent = toolComponents[slug];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: tool.name, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied to clipboard!" });
  };

  const Icon = tool.icon;

  // JSON-LD Schema Generation
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "url": `https://atomest.com/tools/${slug}`,
      "description": tool.metaDescription || tool.description,
      "applicationCategory": "BrowserApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ];

  if (tool.faqs && tool.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": tool.faqs.map(faq => ({
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
        "name": tool.name,
        "item": `https://atomest.com/tools/${slug}`
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title={tool.seoTitle || tool.name}
        description={tool.seoDescription || tool.metaDescription || tool.description}
        canonicalPath={`/tools/${slug}`}
        schema={schemas}
      />
      <Navbar />

      <main className="container mx-auto px-4 py-10 flex-1 max-w-5xl">
        <Breadcrumb items={[
          { label: "Tools", href: "/tools" },
          { label: tool.name }
        ]} />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-xl flex-shrink-0">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
              <p className="text-muted-foreground mt-1">{tool.description}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2" data-testid="button-share">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2" data-testid="button-copy-link">
              <LinkIcon className="h-4 w-4" /> Copy Link
            </Button>
          </div>
        </div>

        {/* Tool Interface */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          {ToolComponent ? (
            <Suspense fallback={<ToolSkeleton />}>
              <ToolComponent />
            </Suspense>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Tool component not found.
            </div>
          )}
        </div>

        {/* Dynamic Semantic Content Architecture */}
        <ToolContentLayout tool={tool} />
      </main>

      <Footer />
    </div>
  );
}
