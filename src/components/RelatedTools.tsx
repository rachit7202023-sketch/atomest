import { Tool, tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface RelatedToolsProps {
  currentTool: Tool;
  explicitSlugs?: string[];
}

export function RelatedTools({ currentTool, explicitSlugs }: RelatedToolsProps) {
  let relatedTools: Tool[] = [];

  if (explicitSlugs && explicitSlugs.length > 0) {
    relatedTools = tools.filter(t => explicitSlugs.includes(t.slug));
  } else {
    relatedTools = tools
      .filter((t) => t.category === currentTool.category && t.id !== currentTool.id)
      .slice(0, 3);
  }

  // Fallback if not enough tools
  if (relatedTools.length === 0) {
    relatedTools = tools.filter((t) => t.id !== currentTool.id).slice(0, 3);
  }

  return (
    <div className="mt-16 pt-16 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
