import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { processCandidatesStream, ProcessCandidatesInput } from './services/processCandidates';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const input = req.body as ProcessCandidatesInput;

    if (!input.jobDescription || !input.jobTitle || !input.resumes || input.resumes.length === 0) {
      res.status(400).json({ error: 'Missing required fields: jobTitle, jobDescription, resumes' });
      return;
    }

    // Supabase Auth Integration
    const authHeader = req.headers.authorization;
    let supabaseClient = null;

    if (authHeader) {
      const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
      
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Configure Server-Sent Events headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Flush headers to establish stream
    res.flushHeaders();

    await processCandidatesStream(input, supabaseClient, (eventData) => {
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });

    res.end();

  } catch (error: any) {
    console.error('API Error:', error);
    res.write(`data: ${JSON.stringify({ event: 'error', error: error.message || 'Internal Server Error' })}\n\n`);
    res.end();
  }
}
