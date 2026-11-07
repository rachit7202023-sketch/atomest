// src/components/output/blocks/TimelineBlock.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import type { TimelineBlock as TimelineBlockType } from '@/core/workflow/types';

interface Props {
  block: TimelineBlockType;
}

const statusConfig = {
  done:     { icon: CheckCircle2, color: 'text-emerald-400', line: 'bg-emerald-500/40' },
  active:   { icon: Clock,        color: 'text-primary',     line: 'bg-primary/40' },
  upcoming: { icon: Circle,       color: 'text-white/30',    line: 'bg-white/10' },
};

export function TimelineBlock({ block }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 border border-white/10 p-6"
    >
      {block.title && (
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5">
          {block.title}
        </h3>
      )}
      <ol className="relative space-y-0">
        {block.events.map((event, i) => {
          const cfg = statusConfig[event.status ?? 'upcoming'];
          const Icon = cfg.icon;
          const isLast = i === block.events.length - 1;

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {/* Vertical connector line */}
              {!isLast && (
                <div className={`absolute left-[13px] top-6 bottom-0 w-px ${cfg.line}`} />
              )}

              <Icon className={`w-7 h-7 shrink-0 ${cfg.color} z-10`} />

              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-sm font-semibold text-foreground">{event.title}</span>
                  <span className="text-xs text-muted-foreground">{event.date}</span>
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}
