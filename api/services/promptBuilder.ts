export function buildPrompt(template: string, variables: Record<string, string | string[]>): string {
  let prompt = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const stringValue = Array.isArray(value) ? value.join(', ') : value;
    // Replace all occurrences of {{key}}
    const regex = new RegExp(`{{${key}}}`, 'g');
    prompt = prompt.replace(regex, stringValue || 'Not specified');
  }
  
  return prompt;
}
