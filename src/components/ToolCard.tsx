import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Tool } from "@/data/tools";
import { categories } from "@/data/categories";

interface ToolCardProps {
  tool: Tool;
  popular?: boolean;
}

// Per-category gradient pairs (from → to) matching the category color palette
const CATEGORY_GRADIENTS: Record<string, [string, string]> = {
  text:        ["#6366f1", "#8b5cf6"],
  developer:   ["#10b981", "#06b6d4"],
  generators:  ["#f59e0b", "#ef4444"],
  calculators: ["#6366f1", "#3b82f6"],
  color:       ["#ec4899", "#f43f5e"],
  image:       ["#f43f5e", "#fb923c"],
  utilities:   ["#64748b", "#6366f1"],
  ai:          ["#8b5cf6", "#6366f1"],
  default:     ["#7c3aed", "#a78bfa"],
};

export function ToolCard({ tool, popular = false }: ToolCardProps) {
  const category = categories.find(c => c.id === tool.category);
  const Icon     = tool.icon;
  const [from, to] = CATEGORY_GRADIENTS[tool.category] ?? CATEGORY_GRADIENTS.default;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link href={`/tools/${tool.slug}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group relative flex flex-col rounded-[24px] bg-card border border-white/5 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 depth-base hover:border-primary/30"
      >
        {/* Magnetic Spotlight Glow */}
        <div className="spotlight-overlay opacity-0 group-hover:opacity-100" />

        {/* Popular badge */}
        {popular && (
          <div
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.10))",
              border: "1px solid rgba(139,92,246,0.30)",
              color: "rgb(167,139,250)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="animate-pulse">✦</span> Popular
          </div>
        )}

        <div className="p-7 flex flex-col h-full relative z-10">
          {/* Icon container */}
          <div className="mb-6 flex items-start">
            <motion.div
              className="flex items-center justify-center rounded-[18px]"
              style={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${from}, ${to})`,
                boxShadow: `0 8px 20px -4px ${from}60`,
                flexShrink: 0,
              }}
            >
              <Icon className="h-7 w-7 text-white drop-shadow-md" />
            </motion.div>
          </div>

          {/* Title + description */}
          <h3 className="text-[1.1rem] font-extrabold mb-2 leading-tight group-hover:text-primary transition-colors duration-300 tracking-tight">
            {tool.name}
          </h3>
          <p className="text-[14px] text-muted-foreground leading-relaxed flex-grow line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {tool.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/40">
            <span
              className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: `linear-gradient(135deg, ${from}15, ${to}10)`,
                border: `1px solid ${from}25`,
                color: from,
              }}
            >
              {category?.name ?? "Tool"}
            </span>

            <span className="flex items-center gap-1.5 text-[13px] font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              Open Tool
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
