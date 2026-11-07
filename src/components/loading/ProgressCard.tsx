import { Loader2, CheckCircle2 } from 'lucide-react';

interface Props {
  status: 'queued' | 'running';
  message: string;
}

export function ProgressCard({ status, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 py-16 rounded-[var(--radius-card)] border border-dashed border-white/10 bg-white/[0.02]">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        
        {/* Spinner ring */}
        <div className="relative bg-background border border-white/10 w-16 h-16 rounded-full flex items-center justify-center">
          {status === 'queued' ? (
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
          )}
        </div>
      </div>
      
      <div className="text-center space-y-1.5">
        <h3 className="font-medium text-foreground">
          {status === 'queued' ? 'Waiting in Queue...' : 'AI is working...'}
        </h3>
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground/60">
        <span className={status !== 'queued' ? 'text-primary' : ''}>
          {status !== 'queued' ? <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> : <div className="w-1.5 h-1.5 bg-current rounded-full inline-block mr-1.5" />}
          Queued
        </span>
        <span className="w-4 h-[1px] bg-white/10" />
        <span className={status === 'running' ? 'text-primary animate-pulse' : ''}>
          {status === 'running' ? <Loader2 className="w-3.5 h-3.5 inline mr-1 animate-spin" /> : <div className="w-1.5 h-1.5 bg-current rounded-full inline-block mr-1.5" />}
          Processing
        </span>
      </div>
    </div>
  );
}
