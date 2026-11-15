import { GoogleGenAI } from '@google/genai';

export function getGeminiClient() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
  }
  
  // @google/genai automatically picks up GOOGLE_API_KEY, but we pass it explicitly.
  return new GoogleGenAI({ apiKey });
}

export async function generateStructuredJson(
  client: GoogleGenAI,
  prompt: string,
  model = 'gemini-2.5-flash'
): Promise<any> {
  const response = await client.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    }
  });

  if (!response.text) {
    throw new Error('Gemini returned an empty response.');
  }

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse Gemini JSON:', response.text);
    throw new Error('Failed to parse structured JSON from Gemini.');
  }
}
