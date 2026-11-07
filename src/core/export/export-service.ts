import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import type { WorkflowOutput, OutputBlock } from '../workflow/types';

export const exportService = {
  /**
   * Downloads the raw JSON output.
   */
  exportJSON(output: WorkflowOutput, filename: string = 'export.json') {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(output, null, 2));
    downloadFile(dataStr, filename);
  },

  /**
   * Converts blocks to Markdown and downloads as a .md file.
   */
  exportMarkdown(output: WorkflowOutput, filename: string = 'export.md') {
    const md = blocksToMarkdown(output.blocks);
    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
    downloadFile(dataStr, filename);
  },

  /**
   * Copies the output as plain text (markdown format) to the clipboard.
   */
  async copyText(output: WorkflowOutput): Promise<void> {
    const text = blocksToMarkdown(output.blocks);
    await navigator.clipboard.writeText(text);
  },

  /**
   * Takes a snapshot of the given DOM element ID and downloads it as a PDF.
   */
  async exportPDF(elementId: string, filename: string = 'export.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element with id ${elementId} not found for PDF export.`);

    // Take snapshot with higher scale for better PDF quality
    const dataUrl = await toPng(element, { quality: 1, pixelRatio: 2 });
    
    // Create PDF (A4 size)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Get image dimensions to maintain aspect ratio
    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = img.width;
    const imgHeight = img.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const marginX = (pdfWidth - finalWidth) / 2;
    const marginY = 20; // 20px top margin

    pdf.addImage(dataUrl, 'PNG', marginX, marginY, finalWidth, finalHeight);
    pdf.save(filename);
  }
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function downloadFile(dataUrl: string, filename: string) {
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataUrl);
  downloadAnchorNode.setAttribute('download', filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function blocksToMarkdown(blocks: OutputBlock[]): string {
  let md = '';
  
  for (const block of blocks) {
    if ('title' in block && block.title) {
      md += `## ${block.title}\n\n`;
    }

    switch (block.type) {
      case 'summary':
        md += `${block.content}\n\n`;
        break;
        
      case 'checklist':
        for (const item of block.items) {
          md += `- [${item.checked ? 'x' : ' '}] **${item.label}**\n`;
        }
        md += '\n';
        break;
        
      case 'table':
        if (block.rows.length > 0) {
          md += `| ${block.columns.join(' | ')} |\n`;
          md += `| ${block.columns.map(() => '---').join(' | ')} |\n`;
          for (const row of block.rows) {
            md += `| ${row.join(' | ')} |\n`;
          }
        }
        md += '\n';
        break;
        
      case 'score':
        md += `**Score**: ${block.value} / ${block.max}\n\n`;
        if (block.label) md += `*${block.label}*\n\n`;
        if (block.rationale) md += `${block.rationale}\n\n`;
        break;
        
      case 'markdown':
        md += `${block.content}\n\n`;
        break;
        
      case 'recommendation':
        for (const item of block.items) {
          md += `**Recommendation**: ${item.title}\n`;
          md += `${item.description}\n\n`;
          if (item.priority) md += `*Priority: ${item.priority}*\n\n`;
        }
        break;
        
      case 'timeline':
        for (const item of block.events) {
          md += `- **${item.date}**: ${item.title}\n`;
          if (item.description) md += `  ${item.description}\n`;
        }
        md += '\n';
        break;
        
      case 'chart':
        md += `*[Chart: ${block.chartType.toUpperCase()}]*\n`;
        md += `- Labels: ${block.labels.join(', ')}\n`;
        for (const dataset of block.datasets) {
          md += `- ${dataset.label}: ${dataset.data.join(', ')}\n`;
        }
        md += '\n';
        break;
    }
  }

  return md.trim();
}
