// src/components/output/blocks/TableBlock.tsx
import { motion } from 'framer-motion';
import type { TableBlock as TableBlockType } from '@/core/workflow/types';

interface Props {
  block: TableBlockType;
}

export function TableBlock({ block }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
    >
      {block.title && (
        <div className="px-6 pt-5 pb-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            {block.title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {block.columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-6 py-4 text-foreground/85 whitespace-pre-wrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
