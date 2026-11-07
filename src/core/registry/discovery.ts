// src/core/registry/discovery.ts
// AUTO-DISCOVERY — no manual registration required.
//
// Vite's import.meta.glob scans src/modules/*/module.ts at build time.
// Every module that exports a default AIEmployeeModule is automatically registered.
//
// Developer workflow to add a new AI Employee:
//   1. mkdir src/modules/my-new-employee
//   2. Create module.ts exporting `export default { ... } satisfies AIEmployeeModule`
//   3. ✅ Done. Platform auto-registers it everywhere.

import type { AIEmployeeModule } from './types';

// Vite resolves this glob at build time — zero runtime overhead
const moduleFiles = import.meta.glob<{ default: AIEmployeeModule }>(
  '../../modules/*/module.ts',
  { eager: true },
);

function buildRegistry(): AIEmployeeModule[] {
  return Object.entries(moduleFiles)
    .map(([path, mod]) => {
      if (!mod?.default) {
        console.warn(`[registry] Module at "${path}" has no default export. Skipping.`);
        return null;
      }
      return mod.default;
    })
    .filter((m): m is AIEmployeeModule => m !== null)
    .sort((a, b) => {
      // Live modules first, then beta, then coming_soon, then disabled
      const order: Record<string, number> = { live: 0, beta: 1, coming_soon: 2, disabled: 3 };
      return (order[a.status] ?? 99) - (order[b.status] ?? 99);
    });
}

export const registry: AIEmployeeModule[] = buildRegistry();

/** Get a module by its ID. Returns undefined if not found. */
export function getModule(id: string): AIEmployeeModule | undefined {
  return registry.find(m => m.id === id);
}

/** All modules visible on the homepage (live, beta, coming_soon) */
export function getVisibleModules(): AIEmployeeModule[] {
  return registry.filter(m => m.status !== 'disabled');
}

/** All modules a user can actually launch */
export function getLiveModules(): AIEmployeeModule[] {
  return registry.filter(m => m.status === 'live' || m.status === 'beta');
}

/** All modules by category */
export function getModulesByCategory(): Record<string, AIEmployeeModule[]> {
  return registry.reduce<Record<string, AIEmployeeModule[]>>((acc, mod) => {
    if (!acc[mod.category]) acc[mod.category] = [];
    acc[mod.category].push(mod);
    return acc;
  }, {});
}
