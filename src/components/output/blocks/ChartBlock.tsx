// src/components/output/blocks/ChartBlock.tsx
// Uses recharts (already in package.json)
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { ChartBlock as ChartBlockType } from '@/core/workflow/types';

interface Props {
  block: ChartBlockType;
}

const CHART_COLORS = ['#6366f1', '#22d3ee', '#f59e0b', '#10b981', '#f43f5e', '#a855f7'];

export function ChartBlock({ block }: Props) {
  // Normalize recharts data format
  const data = block.labels.map((label, li) => {
    const entry: Record<string, string | number> = { name: label };
    block.datasets.forEach(ds => {
      entry[ds.label] = ds.data[li] ?? 0;
    });
    return entry;
  });

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

      <ResponsiveContainer width="100%" height={280}>
        {block.chartType === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: '#6e6e73', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6e6e73', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#6e6e73' }} />
            {block.datasets.map((ds, i) => (
              <Bar key={ds.label} dataKey={ds.label} fill={ds.color ?? CHART_COLORS[i % CHART_COLORS.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : block.chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: '#6e6e73', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6e6e73', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#6e6e73' }} />
            {block.datasets.map((ds, i) => (
              <Line key={ds.label} type="monotone" dataKey={ds.label} stroke={ds.color ?? CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        ) : (
          <PieChart>
            <Pie data={block.datasets[0]?.data.map((v, i) => ({ name: block.labels[i], value: v }))}
              cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value"
            >
              {(block.datasets[0]?.data ?? []).map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#6e6e73' }} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}
