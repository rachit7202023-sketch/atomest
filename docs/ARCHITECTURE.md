# Atomest Architecture

Atomest is a "Modular Monolith" built on React, Vite, and Supabase.
It serves as an Operating System for AI Employees.

## Core Principle: Shared Infrastructure, Individual Workflows

Instead of building a massive, tangled application where every AI feature touches every part of the codebase, Atomest separates **Platform** from **Modules**.

1. **The Platform** handles Auth, Routing, UI Shell, Database, Credits, Jobs, and UI rendering logic.
2. **The Modules** (`src/modules/*`) contain the specialized AI logic (prompts, schemas, specific input forms).

Modules **never** talk to the database directly. They are "pure" workflow definitions.

## The Module Registry

Atomest uses Vite's `import.meta.glob` to automatically discover AI Employees.
When you create a new folder in `src/modules/` and export a `module.ts` file matching the `AIEmployeeModule` interface, the platform automatically:
1. Adds it to the Homepage.
2. Creates a dedicated dynamic route at `/employees/:id`.
3. Handles all execution, credits, and errors.

## The Workflow Engine

The `WorkflowEngine` (`src/core/workflow/engine.ts`) is the bridge.
When a user clicks "Run" on an AI Employee's page:
1. The Engine validates inputs against the module's Zod schema.
2. The Engine checks for sufficient credits.
3. The Engine creates a `Job` record in Supabase.
4. The Engine calls the module's `executeWorkflow` function.
5. When complete, the Engine deducts credits, saves the output, and logs analytics.

## Output System

Modules do not return raw strings. They return a structured `WorkflowOutput` containing a list of `OutputBlock`s (e.g., `SummaryBlock`, `ChecklistBlock`, `ScoreBlock`).
The platform's `OutputRenderer` dynamically maps these blocks to beautiful React components. This ensures all AI Employees share a consistent, high-quality design language without CSS duplication.
