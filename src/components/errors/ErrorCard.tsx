import { AlertCircle, LogIn, CreditCard, RefreshCw, Upload, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { AtomestError } from '@/core/errors/types';

interface Props {
  error: Error | AtomestError;
  onRetry?: () => void;
}

export function ErrorCard({ error, onRetry }: Props) {
  const [, setLocation] = useLocation();

  const isAtomestError = error instanceof AtomestError;
  const code = isAtomestError ? error.code : 'UNKNOWN_ERROR';
  const message = isAtomestError ? error.userMessage : error.message;

  const config = {
    VALIDATION_ERROR: {
      icon: AlertCircle,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Check Inputs & Try Again</Button>,
    },
    AUTH_ERROR: {
      icon: LogIn,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      action: <Button size="sm" onClick={() => setLocation('/login')}>Sign In</Button>,
    },
    CREDIT_ERROR: {
      icon: CreditCard,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      action: <Button size="sm" variant="secondary" onClick={() => setLocation('/dashboard')}>Get More Credits</Button>,
    },
    UPLOAD_ERROR: {
      icon: Upload,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Retry Upload</Button>,
    },
    AI_PROVIDER_ERROR: {
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}><RefreshCw className="w-3 h-3 mr-2" /> Retry</Button>,
    },
    RATE_LIMIT_ERROR: {
      icon: AlertCircle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>,
    },
    UNKNOWN_ERROR: {
      icon: AlertCircle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>,
    }
  }[code] ?? {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    action: onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>,
  };

  const Icon = config.icon;

  return (
    <div className={`p-6 rounded-xl border ${config.border} ${config.bg} flex flex-col items-center justify-center text-center max-w-md mx-auto`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-background border ${config.border}`}>
        <Icon className={`w-6 h-6 ${config.color}`} />
      </div>
      <h3 className={`font-semibold mb-2 ${config.color}`}>
        {code.replace(/_/g, ' ')}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {message}
      </p>
      {config.action}
    </div>
  );
}
