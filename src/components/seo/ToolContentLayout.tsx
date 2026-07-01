import React from "react";
import { Tool } from "@/data/tools";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RelatedTools } from "@/components/RelatedTools";

interface ToolContentLayoutProps {
  tool: Tool;
}

export function ToolContentLayout({ tool }: ToolContentLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-20 py-12">
      {/* What is this tool / Description */}
      <section>
        <h2 className="text-3xl font-extrabold tracking-tight-head mb-5">What is the {tool.name}?</h2>
        <p className="text-muted-foreground leading-relaxed text-[1.1rem]">
          {tool.seoDescription || tool.metaDescription || tool.description}
        </p>
      </section>

      {/* Benefits */}
      {tool.benefits && tool.benefits.length > 0 && (
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight-head mb-8">Why Use This Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tool.benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4 p-5 bg-card border border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mt-0.5">
                  <CheckCircleIcon />
                </div>
                <p className="text-foreground text-[15px] leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works */}
      <section>
        <h2 className="text-3xl font-extrabold tracking-tight-head mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howItWorks ? (
            tool.howItWorks.map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-muted/40 rounded-[24px] border border-white/5 shadow-sm">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-[14px] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                  {item.step || index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-[1.1rem] mb-2">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.description}</p>
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
              <div key={item.step} className="flex gap-4 p-6 bg-muted/40 rounded-[24px] border border-white/5 shadow-sm">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-[14px] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-[1.1rem] mb-2">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section>
          <h2 className="text-3xl font-extrabold tracking-tight-head mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {tool.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 rounded-2xl px-6 py-1 bg-card shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-left font-bold text-[15px] hover:no-underline hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[14px] leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Related Tools (Topic Cluster) */}
      <section>
        <h2 className="text-3xl font-extrabold tracking-tight-head mb-8">Related Tools</h2>
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
