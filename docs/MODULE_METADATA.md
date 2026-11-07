# Module Metadata and UI Rendering

The `AIEmployeeModule` interface requires rich metadata for every AI Employee. This metadata drives the platform UI automatically.

## Identity
- `id`: URL slug (e.g., `recruiter-ai`).
- `name`: Human-readable name.
- `tagline`: Short punchy description for cards.
- `description`: Long-form description for the module page.

## Visuals
- `icon`: Lucide React icon.
- `accentColor`: Hex/HSL color string.

## Capabilities
- `supportsFiles`: boolean.
- `supportedFileTypes`: Array of extensions.

## Status
- `status`: `'live' | 'beta' | 'coming_soon' | 'disabled'`.
  - `coming_soon` modules appear on the homepage but cannot be clicked.
  - `disabled` modules are hidden or grayed out.

## Output Block System
Atomest uses a specialized structured output system (`WorkflowOutput`) to render data without custom CSS.

Available blocks:
- `summary`: Simple text block.
- `checklist`: Interactive task list.
- `table`: Data grid.
- `score`: Big number with max value and label.
- `markdown`: Render raw Markdown.
- `timeline`: Sequential events.
- `recommendation`: Headline, details, impact, effort.
- `chart`: Simple data visualization.

Simply return these blocks from your module's `executeWorkflow` function, and the platform handles the rest.
