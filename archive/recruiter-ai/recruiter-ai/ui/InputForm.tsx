// src/modules/recruiter-ai/ui/InputForm.tsx
// The input UI for AI Recruiter. Only knows about forms, not AI.

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { processUpload } from '@/core/file-pipeline/file-service';
import type { InputComponentProps } from '@/core/registry/types';
import type { RecruiterInput } from '../schema';

export function RecruiterInputForm({ onSubmit, isLoading, initialValues }: InputComponentProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [candidateText, setCandidateText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; text: string }[]>([]);
  const [parsing, setParsing] = useState(false);

  useEffect(() => {
    if (initialValues) {
      if (typeof initialValues.jobTitle === 'string') setJobTitle(initialValues.jobTitle);
      if (typeof initialValues.company === 'string') setCompany(initialValues.company);
      if (typeof initialValues.jobDescription === 'string') setJobDescription(initialValues.jobDescription);
    }
  }, [initialValues]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    multiple: true,
    onDrop: async (files) => {
      setParsing(true);
      const results = await Promise.all(
        files.map(async (f) => {
          const parsed = await processUpload(f);
          return { name: f.name, text: parsed.text };
        }),
      );
      setUploadedFiles(prev => [...prev, ...results]);
      setParsing(false);
    },
  });

  const removeFile = (name: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allCandidateData = [
      ...uploadedFiles.map(f => `--- ${f.name} ---\n${f.text}`),
      candidateText,
    ].filter(Boolean).join('\n\n');

    onSubmit({
      jobTitle,
      company,
      jobDescription,
      candidateData: allCandidateData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="jobTitle" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Job Title
          </Label>
          <Input
            id="jobTitle"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="Senior Software Engineer"
            required
            className="bg-white/5 border-white/10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Company
          </Label>
          <Input
            id="company"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Acme Corp"
            required
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="jd" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Job Description
        </Label>
        <Textarea
          id="jd"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here…"
          rows={5}
          required
          className="bg-white/5 border-white/10 resize-none"
        />
      </div>

      {/* Resume upload */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Candidate Resumes
        </Label>
        <div
          {...getRootProps()}
          className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-white/15 hover:border-white/25 bg-white/3'
          }`}
        >
          <input {...getInputProps()} />
          {parsing ? (
            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          )}
          <p className="text-sm text-muted-foreground">
            {isDragActive ? 'Drop to upload' : 'Drop PDFs or TXTs, or click to browse'}
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <ul className="space-y-1.5 mt-2">
            {uploadedFiles.map(f => (
              <li key={f.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8">
                <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-xs text-foreground flex-1 truncate">{f.name}</span>
                <button type="button" onClick={() => removeFile(f.name)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paste fallback */}
      <div className="space-y-1.5">
        <Label htmlFor="candidatePaste" className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Or Paste Resume Text
        </Label>
        <Textarea
          id="candidatePaste"
          value={candidateText}
          onChange={e => setCandidateText(e.target.value)}
          placeholder="Paste one or more candidate resumes here…"
          rows={4}
          className="bg-white/5 border-white/10 resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || parsing || !jobTitle || !company || !jobDescription || (uploadedFiles.length === 0 && !candidateText)}
        className="w-full h-11 font-semibold"
        style={{ borderRadius: 'var(--radius-pill)' }}
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building hiring kit…</>
        ) : (
          'Hire the AI Recruiter'
        )}
      </Button>
    </form>
  );
}
