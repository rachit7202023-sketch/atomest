// src/components/output/blocks/ScoreBlock.tsx
import { motion } from 'framer-motion';
import type { ScoreBlock as ScoreBlockType } from '@/core/workflow/types';

interface Props {
  block: ScoreBlockType;
}

const colorMap = {
  green:  { bar: 'bg-emerald-500', text: 'text-emerald-400' },
  yellow: { bar: 'bg-amber-500',   text: 'text-amber-400' },
  red:    { bar: 'bg-red-500',     text: 'text-red-400' },
  blue:   { bar: 'bg-primary',     text: 'text-primary' },
};

function deriveColor(value: number, max: number): 'green' | 'yellow' | 'red' {
  const pct = value / max;
  if (pct >= 0.7) return 'green';
  if (pct >= 0.4) return 'yellow';
  return 'red';
}

export function ScoreBlock({ block }: Props) {
  const colorKey = block.color ?? deriveColor(block.value, block.max);
  const { bar, text } = colorMap[colorKey];
  const percent = Math.min(100, (block.value / block.max) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          {block.label}
        </h3>
        <span className={`text-2xl font-black ${text}`}>
          {block.value}<span className="text-sm font-normal text-muted-foreground">/{block.max}</span>
        </span>
      </div>

      {/* Bar */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full ${bar}`}
        />
      </div>

      {block.rationale && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {block.rationale}
        </p>
      )}
    </motion.div>
  );
}
