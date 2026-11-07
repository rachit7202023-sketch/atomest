// src/components/output/blocks/RecommendationBlock.tsx
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Info } from 'lucide-react';
import type { RecommendationBlock as RecommendationBlockType } from '@/core/workflow/types';

interface Props {
  block: RecommendationBlockType;
}

const priorityConfig = {
  high:   { border: 'border-red-500/30',    badge: 'bg-red-500/10 text-red-400',    label: 'High' },
  medium: { border: 'border-amber-500/30',  badge: 'bg-amber-500/10 text-amber-400',  label: 'Medium' },
  low:    { border: 'border-white/10',       badge: 'bg-white/5 text-muted-foreground', label: 'Low' },
};

export function RecommendationBlock({ block }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 p-6"
    >
      {block.title && (
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          {block.title}
        </h3>
      )}
      <ul className="space-y-3">
        {block.items.map((item, i) => {
          const cfg = priorityConfig[item.priority ?? 'low'];
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.border} bg-white/3`}
            >
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  {item.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
