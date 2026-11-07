// src/core/file-pipeline/file-service.ts
// Shared upload → parse → normalize pipeline.
// Every module reuses this — no per-module file parsing code.
// Migrates and centralises the existing pdf-parser logic.

export type ParsedDocumentType = 'pdf' | 'docx' | 'csv' | 'txt' | 'image' | 'unknown';

export interface ParsedDocument {
  type: ParsedDocumentType;
  text: string;             // Plain text content
  filename: string;
  sizeBytes: number;
  pageCount?: number;       // PDFs
  rowCount?: number;        // CSVs
  metadata?: Record<string, unknown>;
}

export class UnsupportedFormatError extends Error {
  constructor(ext: string | undefined) {
    super(`Unsupported file format: .${ext ?? 'unknown'}`);
    this.name = 'UnsupportedFormatError';
  }
}

/**
 * Parse any supported file into a normalised ParsedDocument.
 * This is the single entry point all modules use.
 */
export async function processUpload(file: File): Promise<ParsedDocument> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return parsePDF(file);
    case 'txt':
    case 'md':
      return parseTXT(file);
    case 'csv':
      return parseCSV(file);
    case 'docx':
      return parseDOCX(file);
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'webp':
      return parseImage(file);
    default:
      throw new UnsupportedFormatError(ext);
  }
}

async function parsePDF(file: File): Promise<ParsedDocument> {
  // Dynamically import pdfjs to keep the main bundle lean
  const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist');
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: Record<string, unknown>) => (item as { str?: string }).str ?? '')
      .join(' ');
    pages.push(pageText);
  }

  return {
    type: 'pdf',
    text: pages.join('\n\n'),
    filename: file.name,
    sizeBytes: file.size,
    pageCount: pdf.numPages,
  };
}

async function parseTXT(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  return {
    type: 'txt',
    text,
    filename: file.name,
    sizeBytes: file.size,
  };
}

async function parseCSV(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  const rows = text.trim().split('\n');
  return {
    type: 'csv',
    text,
    filename: file.name,
    sizeBytes: file.size,
    rowCount: rows.length,
  };
}

async function parseDOCX(file: File): Promise<ParsedDocument> {
  // DOCX is just a ZIP — extract the main document XML
  // For now, return a best-effort text extraction notice
  // Full implementation: install mammoth.js
  console.warn('[file-pipeline] DOCX parsing is basic. Install mammoth for full extraction.');
  return {
    type: 'docx',
    text: `[DOCX file: ${file.name}. Install mammoth.js for full text extraction.]`,
    filename: file.name,
    sizeBytes: file.size,
  };
}

async function parseImage(file: File): Promise<ParsedDocument> {
  // Convert to base64 data URI for use with vision providers
  const base64 = await fileToDataUri(file);
  return {
    type: 'image',
    text: base64,   // Modules pass this to IAIProvider.vision()
    filename: file.name,
    sizeBytes: file.size,
    metadata: { mimeType: file.type },
  };
}

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
