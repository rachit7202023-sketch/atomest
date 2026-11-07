// src/components/output/blocks/ChecklistBlock.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import type { ChecklistBlock as ChecklistBlockType } from '@/core/workflow/types';

interface Props {
  block: ChecklistBlockType;
}

const priorityConfig = {
  high:   { color: 'text-red-400',    label: 'High' },
  medium: { color: 'text-amber-400',  label: 'Medium' },
  low:    { color: 'text-emerald-400', label: 'Low' },
};

export function ChecklistBlock({ block }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 p-6"
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        {block.title}
      </h3>
      <ul className="space-y-2.5">
        {block.items.map((item, i) => {
          const pc = item.priority ? priorityConfig[item.priority] : null;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="flex items-start gap-3"
            >
              {item.checked
                ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                : <Circle className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
              }
              <span className="text-sm text-foreground/85 flex-1">{item.label}</span>
              {pc && (
                <span className={`text-xs font-medium ${pc.color}`}>{pc.label}</span>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
