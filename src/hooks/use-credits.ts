// src/hooks/use-credits.ts
// React hook for live credit balance using React Query.

import { useQuery } from '@tanstack/react-query';
import { creditsService } from '@/core/credits/credits-service';
import { useAuth } from '@/contexts/AuthContext';

export function useCredits() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['credits', user?.id],
    queryFn: () => creditsService.getUserCredits(user!.id),
    enabled: !!user?.id,
    staleTime: 30_000,       // 30 seconds
    refetchOnWindowFocus: true,
  });
}
