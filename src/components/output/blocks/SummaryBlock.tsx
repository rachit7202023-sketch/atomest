// src/components/output/blocks/SummaryBlock.tsx
import { motion } from 'framer-motion';
import { marked } from 'marked';
import type { SummaryBlock as SummaryBlockType } from '@/core/workflow/types';

interface Props {
  block: SummaryBlockType;
}

export function SummaryBlock({ block }: Props) {
  const html = marked.parse(block.content) as string;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 p-6"
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        {block.title}
      </h3>
      <div
        className="prose prose-invert prose-sm max-w-none text-foreground/90 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  );
}
