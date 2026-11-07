// src/core/workflow/prompt-loader.ts
// Loads prompt markdown files from any module's prompts/ directory.
// Vite's import.meta.glob + { as: 'raw' } bundles them as strings at build time.
// Supports simple {{variable}} template interpolation.

// Eager raw import of all module prompt files
const promptFiles = import.meta.glob<string>(
  '../../modules/*/prompts/*.md',
  { eager: true, query: '?raw', import: 'default' },
);

/**
 * Load a prompt template for a given module.
 *
 * @param moduleId  - e.g. 'recruiter-ai'
 * @param file      - 'system' | 'user' | 'fewshot'
 * @returns The raw markdown string, or empty string if not found
 */
export function loadPrompt(
  moduleId: string,
  file: 'system' | 'user' | 'fewshot',
): string {
  const key = `../../modules/${moduleId}/prompts/${file}.md`;
  const content = promptFiles[key];
  if (!content) {
    if (file !== 'fewshot') {
      console.warn(`[prompt-loader] Missing prompt: ${moduleId}/${file}.md`);
    }
    return '';
  }
  return content;
}

/**
 * Interpolate a prompt template with variables.
 * Replaces {{key}} placeholders with values from the vars object.
 *
 * @example
 * interpolatePrompt('Hello {{name}}!', { name: 'Alice' })
 * // → 'Hello Alice!'
 */
export function interpolatePrompt(
  template: string,
  vars: Record<string, string | number | boolean | null | undefined>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    return value !== undefined && value !== null ? String(value) : `{{${key}}}`;
  });
}

/**
 * Build a complete prompt for a module combining system + fewshot + user templates.
 *
 * @param moduleId - e.g. 'recruiter-ai'
 * @param vars     - Variables to interpolate into the user template
 * @returns Object with systemPrompt and userPrompt ready to send to IAIProvider
 */
export function buildPrompt(
  moduleId: string,
  vars: Record<string, string | number | boolean | null | undefined>,
): { systemPrompt: string; userPrompt: string } {
  const system = loadPrompt(moduleId, 'system');
  const user = loadPrompt(moduleId, 'user');
  const fewshot = loadPrompt(moduleId, 'fewshot');

  const userWithFewshot = fewshot
    ? `${fewshot}\n\n---\n\n${interpolatePrompt(user, vars)}`
    : interpolatePrompt(user, vars);

  return {
    systemPrompt: system,
    userPrompt: userWithFewshot,
  };
}
