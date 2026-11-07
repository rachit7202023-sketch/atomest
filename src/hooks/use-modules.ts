// src/hooks/use-modules.ts
// React hook to access the module registry anywhere in the UI.
// Applies feature flag overrides transparently.

import { useMemo } from 'react';
import { registry, getLiveModules, getVisibleModules, getModule } from '@/core/registry/discovery';
import { getModuleStatus } from '@/core/feature-flags/flags';
import type { AIEmployeeModule } from '@/core/registry/types';

/** Apply feature flag overrides to a module's status */
function applyFlags(module: AIEmployeeModule): AIEmployeeModule {
  return { ...module, status: getModuleStatus(module.id, module.status) };
}

/** All modules visible in the UI (flag-aware). */
export function useModules() {
  return useMemo(
    () => getVisibleModules().map(applyFlags),
    [],
  );
}

/** Only modules a user can actually launch (flag-aware). */
export function useLiveModules() {
  return useMemo(
    () => getLiveModules().map(applyFlags),
    [],
  );
}

/** Single module by ID (flag-aware). */
export function useModule(id: string): AIEmployeeModule | undefined {
  return useMemo(() => {
    const mod = getModule(id);
    return mod ? applyFlags(mod) : undefined;
  }, [id]);
}
