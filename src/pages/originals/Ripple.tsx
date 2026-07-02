import { SEO } from "@/components/seo/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OriginalLayout } from "@/originals/core/OriginalLayout";
import { RippleProvider, useRipple } from "@/originals/ripple/store/useRippleStore";
import { RippleInputSection } from "@/originals/ripple/components/RippleInputSection";
import { RippleTime } from "@/originals/ripple/components/RippleTime";
import { RippleOpportunity } from "@/originals/ripple/components/RippleOpportunity";
import { RippleRegret } from "@/originals/ripple/components/RippleRegret";
import { RippleReflection } from "@/originals/ripple/components/RippleReflection";
import { Link } from "wouter";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function RippleJourney() {
  const { isPebbleDropped } = useRipple();

  return (
    <>
      <RippleInputSection />
      
      {isPebbleDropped && (
        <div className="space-y-40 py-20 pb-40">
          <RippleTime />
          <RippleOpportunity />
          <RippleRegret />
          <RippleReflection />
        </div>
      )}
    </>
  );
}

export default function RipplePage() {
  return (
    <OriginalLayout theme="dark">
      <SEO 
        title="Ripple | Atomest Originals"
        description="Every decision creates a ripple. See where it leads. An interactive decision mapping engine."
        canonicalPath="/originals/ripple"
      />
      <Navbar />

      <div className="pt-24 pb-8 max-w-4xl mx-auto w-full relative z-10 px-4 sm:px-0">
        <Link href="/originals">
          <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Originals
          </button>
        </Link>
      </div>

      <RippleProvider>
        <RippleJourney />
      </RippleProvider>

      <Footer />
    </OriginalLayout>
  );
}
