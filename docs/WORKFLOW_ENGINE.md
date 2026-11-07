# The Workflow Engine

The `WorkflowEngine` is the core orchestrator of Atomest.

## Responsibilities

1. **Isolation**: It ensures that AI modules do not have to worry about billing, state management, error boundaries, or analytics.
2. **Safety**: It validates module inputs via Zod before any AI calls are made.
3. **Billing**: It deducts credits only upon successful execution, and refunds them if the execution fails (unless the failure was a credit deficit).

## The Execution Flow

1. User clicks "Run" in `EmployeePage.tsx`.
2. UI calls `workflowEngine.run(moduleId, inputs, userId)`.
3. Engine:
   - Validates `inputs`.
   - Checks credits.
   - Creates a new `Job` record in Supabase (status `queued`).
4. Engine returns the `Job` to the UI immediately, and kicks off `_executeAsync` in the background.
5. UI polls `jobService` for status updates.
6. `_executeAsync` runs the module's `executeWorkflow`, captures the `WorkflowOutput`, updates the Job, logs analytics, and deducts credits.

## Error Handling

The engine traps all exceptions. It updates the Job record to `failed` and records the error message. The UI will pick this up on its next poll and display a beautiful `ErrorCard` to the user.
