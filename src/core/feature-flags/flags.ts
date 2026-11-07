// src/core/feature-flags/flags.ts
// Module visibility control. Zero code changes needed to hide/show/launch a module.
//
// Priority order:
//   1. VITE_MODULE_FLAGS env var (JSON object) — for CI/CD overrides
//   2. Supabase remote config (future) — for live flag flipping without redeploy
//   3. Module's own `status` field — the default
//
// Example .env:
//   VITE_MODULE_FLAGS={"website-audit":"live","proposal-generator":"disabled"}

import type { ModuleStatus } from '../registry/types';

type FlagsConfig = Partial<Record<string, ModuleStatus>>;

function loadEnvFlags(): FlagsConfig {
  try {
    const raw = import.meta.env.VITE_MODULE_FLAGS;
    if (!raw) return {};
    return JSON.parse(raw) as FlagsConfig;
  } catch {
    console.warn('[feature-flags] Failed to parse VITE_MODULE_FLAGS. Using module defaults.');
    return {};
  }
}

const envFlags: FlagsConfig = loadEnvFlags();

/**
 * Get the effective status for a module.
 * Env flags override the module's own declared status.
 */
export function getModuleStatus(moduleId: string, defaultStatus: ModuleStatus): ModuleStatus {
  return envFlags[moduleId] ?? defaultStatus;
}

/**
 * Returns true if the module is accessible to users (live or beta).
 */
export function isModuleLive(moduleId: string, defaultStatus: ModuleStatus): boolean {
  const status = getModuleStatus(moduleId, defaultStatus);
  return status === 'live' || status === 'beta';
}

/**
 * Returns true if the module should appear anywhere in the UI.
 */
export function isModuleVisible(moduleId: string, defaultStatus: ModuleStatus): boolean {
  const status = getModuleStatus(moduleId, defaultStatus);
  return status !== 'disabled';
}
