# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Atomest is a hybrid project that has evolved beyond its original description in `replit.md` (which documents an older, purely client-side "tools" version). The current codebase is two things at once:

1. **A marketing site** (React + Vite + Tailwind) — pages under `src/pages/`, layout under `src/components/layout/`, shadcn/ui primitives under `src/components/ui/`. Routing is via **wouter**. Deployed to Vercel (`vercel.json`, SPA rewrite to `index.html`).
2. **An "AI Employee" platform** (`src/core/`) — a registry-driven workflow engine where each AI Employee is a self-registering module. Backend concerns (Supabase auth/storage/jobs/credits, Vercel serverless functions with SSE streaming) live under `api/` and `src/lib/supabase.ts`.

There is no test runner configured (no vitest, no `playwright.config.ts`), despite `playwright` appearing in devDependencies. There is no lint script.

## Commands

All run from the repo root. Package manager is `npm` (package.json scripts use `npm`; `replit.md` mentions `pnpm` but `package.json` scripts are `npm`-agnostic via `npm run`).

- `npm run dev` — starts the Vite dev client on `:3000` **and** a local Express API server on `:3001` (`scripts/api-server.ts`) that proxies the Vercel handlers. Vite proxies `/api` to `:3001`. This is the standard dev workflow.
- `npm run build` — `build:client` (`tsc -b && vite build --outDir dist/client`) → `build:server` (`vite build --ssr src/entry-server.tsx --outDir dist/server`) → `prerender` (`tsx scripts/prerender.ts`).
- `npm run preview` — `vite preview` on `:3000`.
- `npm run typecheck` — `tsc --noEmit`. Run this before committing; `strict: true` is on.

There is no `test` script. To typecheck only: `npm run typecheck`. To run a single check you'd have to add one yourself — there is no existing test suite to target.

## Environment

- `.env` and `.env.*` are gitignored (only `.env.example` is committed). `.env.example` defines `GOOGLE_GENERATIVE_AI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. The local `.env` contains real values but must not be committed.
- AI provider is chosen by `VITE_AI_PROVIDER` (default `gemini`) in `src/core/ai/providers/index.ts`. Only `gemini` is implemented; `openai` is a stub that throws on every method.
- Vite dev server proxies `/api` → `http://localhost:3001`; production API routes are Vercel serverless functions under `api/`.

## High-level architecture

### 1. Workflow engine (`src/core/workflow/`)
`WorkflowEngine` (`engine.ts`) is the heart of the platform. `workflowEngine.run(moduleId, rawInputs, userId)`:
1. Looks the module up in the registry (`getModule`).
2. Validates inputs against the module's Zod `inputSchema` (`ValidationError` on failure).
3. Checks credits via `creditsService.canRun` (`InsufficientCreditsError` if short).
4. Creates a `Job` record (status `queued`) via `jobService.create`.
5. Emits `workflow_started` analytics, then runs `module.executeWorkflow(inputs, ctx)` **asynchronously** (returns the Job immediately so the UI can poll).
6. On success: deducts credits, emits `workflow_completed`, marks job `completed`.
7. On failure: refunds credits (unless it was a credits error), emits `workflow_failed`, marks job `failed`.

`WorkflowContext` injected into each module provides: `provider` (the active `IAIProvider`), `userId`, `jobId`, and an optional `reportProgress` callback. Modules must never call AI providers, credits, analytics, or jobs directly — the engine handles all platform side-effects.

`WorkflowOutput` is an array of `OutputBlock`s (`summary`, `checklist`, `table`, `score`, `chart`, `markdown`, `timeline`, `recommendation`), rendered by `src/components/output/OutputRenderer.tsx` which maps block type → block component under `src/components/output/blocks/`.

### 2. Module registry (`src/core/registry/`)
`discovery.ts` uses `import.meta.glob('src/modules/*/module.ts', { eager: true })` to **auto-register** every module exporting a default `AIEmployeeModule`. No manual registration. To add a new AI Employee: create `src/modules/<slug>/module.ts` exporting `export default { ... } satisfies AIEmployeeModule`.

The module contract (`types.ts`): identity fields (`id`, `name`, `tagline`, `description`), visual (`icon`, `accentColor`), marketplace metadata (`version`, `author`, `category`, `tags`), platform config (`status: 'live'|'beta'|'coming_soon'|'disabled'`, `pricingTier`, `creditsRequired`, `estimatedRuntime`, `estimatedTimeSaved`), capabilities (`supportsFiles`, `supportsStreaming`, `supportedFileTypes`), runtime (`inputSchema: ZodSchema`, `InputComponent`, `executeWorkflow`), and optional `routes`/`templates`/`demo`.

Note: `src/modules/` does not currently exist in the tree — the registry glob will resolve to nothing until modules are created. `getVisibleModules()`, `getLiveModules()`, `getModulesByCategory()`, `getModule(id)` are the query helpers.

### 3. AI provider layer (`src/core/ai/`)
`types.ts` defines `IAIProvider` (`generate`, `stream`, `embeddings`, `vision`) and `AIProviderError`. `providers/index.ts` reads `VITE_AI_PROVIDER`, caches the instance, and exposes `getActiveProvider()` + `resetProvider()`. `gemini.ts` wraps `@google/genai` (default model `gemini-2.0-flash`, embed `text-embedding-004`). `openai.ts` is an unimplemented stub.

Separately, the legacy Vercel API under `api/services/gemini.ts` has its own `getGeminiClient()`/`generateStructuredJson()` using env `GOOGLE_GENERATIVE_AI_API_KEY` — this is the older server-side path used by `api/process-candidates.ts` and `api/generate-kit.ts`, distinct from the client-side `src/core/ai/` provider layer.

### 4. Services (all Supabase-backed, singleton instances)
- `src/core/credits/credits-service.ts` — `canRun`/`deduct`/`refundOnFailure`/`getBalance`/`getUserCredits`/`addCredits`. Backed by Supabase RPCs `deduct_credits`/`refund_credits`/`add_credits` and table `user_credits` + ledger `credit_transactions`. Only this service touches credit balances.
- `src/core/jobs/job-service.ts` — `create`/`update`/`getById`/`getByUser`/`getByModule` on table `jobs`. Maps snake_case DB rows ↔ camelCase `Job` TS type.
- `src/core/storage/storage-service.ts` — `upload`/`uploadContent`/`getSignedUrl`/`delete`/`list` on Supabase bucket `atomest-outputs`.
- `src/core/analytics/analytics-service.ts` — event emitter used by the workflow engine.
- `src/core/file-pipeline/file-service.ts` — file ingestion (PDF extraction via `src/lib/pdfExtractor.ts` / `pdf-parser.ts`).
- `src/core/feature-flags/flags.ts`, `src/core/errors/types.ts` (`AtomestError`, `ValidationError`, `InsufficientCreditsError`).

### 5. Frontend
`src/App.tsx` composes providers: `HelmetProvider` → `ThemeProvider` (dark default, `storageKey="atomest-theme"`, custom — not next-themes) → `AuthProvider` → `QueryClientProvider` → `TooltipProvider` → `WouterRouter` → `AppRouter`. `@/` alias → `src/`.

Key pages: `Home.tsx`, `Dashboard.tsx` (registry-driven, uses `useAuth`/`useCredits`/`useLiveModules`), `About.tsx`, `Services.tsx`, `Work.tsx`, `Contact.tsx`, `DigitalProducts.tsx`, `solutions/{Agents,Automation,Products,Websites}.tsx`, `auth/{Login,Signup,Account}.tsx`, `not-found.tsx`.

`src/components/layout/DashboardLayout.tsx` wraps authenticated dashboard routes; `ProtectedRoute.tsx` / `AuthGate.tsx` guard them; `AuthContext.tsx` manages supabase auth state.

`src/hooks/use-mobile.tsx` (`useIsMobile`), `src/hooks/use-toast.ts`. `use-modules` and `use-credits` are imported by `Dashboard.tsx` but were not located in the tree — verify they exist before importing.

### 6. Serverless API (`api/`)
Vercel functions under `api/`: `generate-kit.ts`, `process-candidates.ts`, `waitlist.ts`, `contact.ts`. All use SSE (`text/event-stream`) streaming and Supabase Auth via the `Authorization` header. Local dev equivalent is `scripts/api-server.ts` (Express on `:3001`) which adapts each Vercel handler.

`vercel.json`: `buildCommand: "npm run build"`, `outputDirectory: "dist/client"`, SPA rewrite `/(.*)` → `/index.html`, plus permanent redirects for legacy routes (`/tools` → `/solutions/automation`, `/employees/*` → `/solutions/agents`, etc.).

## Conventions / gotchas

- Do not import `useTheme` from an external package — use `@/components/theme-provider` (it's a custom provider, not next-themes).
- Modules are auto-discovered via glob; creating `src/modules/<slug>/module.ts` is sufficient for registration — nothing else to edit.
- Supabase columns are snake_case; service layers map to camelCase TS types (`jobService.mapRow`).
- `src/main.tsx.bak` and `src/App.tsx.bak` are stale backup files — ignore them.
- `.env` holds real credentials locally but is gitignored; never commit it. `.env.example` is the template to share.
- No test framework is set up; if you add tests, also add a `test` script to `package.json`.

## Related documentation

`replit.md` in the repo root contains an older overview of the client-side tooling stack (React 19 + Vite 7 + Tailwind v4 + shadcn/ui, 31 client-side tools, lazy-loaded via `React.lazy`, dark mode via custom ThemeProvider). It is outdated relative to the current AI Employee platform architecture but its stack notes and "Gotchas" section (three-file registration for adding a tool, `useTheme` import path) are still relevant for the marketing-site portions of the codebase.
