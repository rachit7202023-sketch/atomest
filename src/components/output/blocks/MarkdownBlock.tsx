// src/components/output/blocks/MarkdownBlock.tsx
import { motion } from 'framer-motion';
import { marked } from 'marked';
import type { MarkdownBlock as MarkdownBlockType } from '@/core/workflow/types';

interface Props {
  block: MarkdownBlockType;
}

export function MarkdownBlock({ block }: Props) {
  const html = marked.parse(block.content) as string;

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
      <div
        className="prose prose-invert prose-sm max-w-none
          prose-headings:font-semibold prose-headings:text-foreground
          prose-p:text-foreground/85 prose-p:leading-relaxed
          prose-li:text-foreground/85 prose-li:leading-relaxed
          prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  );
}
