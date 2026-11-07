// src/components/output/OutputRenderer.tsx
// Maps OutputBlock[] → visual components.
// This is the only component the dashboard/module pages need to import.

import { SummaryBlock } from './blocks/SummaryBlock';
import { ChecklistBlock } from './blocks/ChecklistBlock';
import { TableBlock } from './blocks/TableBlock';
import { ScoreBlock } from './blocks/ScoreBlock';
import { MarkdownBlock } from './blocks/MarkdownBlock';
import { TimelineBlock } from './blocks/TimelineBlock';
import { RecommendationBlock } from './blocks/RecommendationBlock';
import { ChartBlock } from './blocks/ChartBlock';
import { Copy, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { exportService } from '@/core/export/export-service';
import type { OutputBlock, WorkflowOutput } from '@/core/workflow/types';
import { toast } from 'sonner';

interface Props {
  output: WorkflowOutput;
  className?: string;
}

function renderBlock(block: OutputBlock, index: number) {
  switch (block.type) {
    case 'summary':        return <SummaryBlock        key={index} block={block} />;
    case 'checklist':      return <ChecklistBlock      key={index} block={block} />;
    case 'table':          return <TableBlock          key={index} block={block} />;
    case 'score':          return <ScoreBlock          key={index} block={block} />;
    case 'markdown':       return <MarkdownBlock       key={index} block={block} />;
    case 'timeline':       return <TimelineBlock       key={index} block={block} />;
    case 'recommendation': return <RecommendationBlock key={index} block={block} />;
    case 'chart':          return <ChartBlock          key={index} block={block} />;
    default: {
      console.warn('[OutputRenderer] Unknown block type:', (block as OutputBlock).type);
      return null;
    }
  }
}

export function OutputRenderer({ output, className }: Props) {
  if (!output?.blocks?.length) return null;

  const handleCopy = async () => {
    try {
      await exportService.copyText(output);
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className={`space-y-4 ${className ?? ''}`} id="output-export-container">
      <div className="flex items-center justify-between mb-6">
        {output.title ? (
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            {output.title}
          </h2>
        ) : <div />}
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs">
            <Copy className="w-3 h-3 mr-1.5" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportService.exportMarkdown(output)} className="h-8 text-xs">
            <FileText className="w-3 h-3 mr-1.5" /> Markdown
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportService.exportJSON(output)} className="h-8 text-xs">
            <Download className="w-3 h-3 mr-1.5" /> JSON
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportService.exportPDF('output-export-container', `${output.title || 'export'}.pdf`)} className="h-8 text-xs">
            <ImageIcon className="w-3 h-3 mr-1.5" /> PDF
          </Button>
        </div>
      </div>

      <div className="space-y-4 bg-background p-1 rounded-xl">
        {output.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
}
