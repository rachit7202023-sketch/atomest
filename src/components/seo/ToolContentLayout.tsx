import React from "react";
import { Tool } from "@/data/tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RelatedTools } from "@/components/RelatedTools";

interface ToolContentLayoutProps {
  tool: Tool;
}

export function ToolContentLayout({ tool }: ToolContentLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-16 py-12">
      {/* What is this tool / Description */}
      <section>
        <h2 className="text-2xl font-bold mb-4">What is the {tool.name}?</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {tool.seoDescription || tool.metaDescription || tool.description}
        </p>
      </section>

      {/* Benefits */}
      {tool.benefits && tool.benefits.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Why Use This Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.benefits.map((benefit, i) => (
              <div key={i} className="flex gap-3 p-4 bg-card border rounded-xl shadow-sm">
                <div className="text-primary mt-0.5">
                  <CheckCircleIcon />
                </div>
                <p className="text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works */}
      <section>
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howItWorks ? (
            tool.howItWorks.map((item, index) => (
              <div key={index} className="flex gap-4 p-5 bg-muted/40 rounded-xl border border-border">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step || index + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            // Fallback generic steps if tool data hasn't been updated yet
            [
              { step: "1", title: "Input Your Data", desc: `Enter or paste your content into the ${tool.name} interface.` },
              { step: "2", title: "Instant Processing", desc: "The tool processes your input instantly, right in your browser." },
              { step: "3", title: "Use Your Results", desc: "Copy, download, or use your results directly from the page." },
            ].map(item => (
              <div key={item.step} className="flex gap-4 p-5 bg-muted/40 rounded-xl border border-border">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {tool.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Related Tools (Topic Cluster) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
        <RelatedTools currentTool={tool} explicitSlugs={tool.relatedToolSlugs} />
      </section>
    </article>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
