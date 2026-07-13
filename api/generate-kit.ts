import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateKitArtifacts, GenerateKitInput } from './services/generateKit';
import pdfParse from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const input = req.body as GenerateKitInput;

    let finalJobDescription = input.jobDescription || "";

    if (!finalJobDescription || !input.jobTitle) {
      res.status(400).json({ error: 'Missing required fields: jobTitle, jobDescription' });
      return;
    }

    // Supabase Auth Integration for RLS Persistence
    const authHeader = req.headers.authorization;
    let supabaseClient = null;
    let runId = null;
    let userId = null;

    if (authHeader) {
      const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
      
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });

      const { data: { user } } = await supabaseClient.auth.getUser();
      userId = user?.id;

      if (userId && input.projectId) {
        // Record the generation run
        const { data: runData } = await supabaseClient.from('generation_runs').insert({
          project_id: input.projectId,
          user_id: userId,
          prompt_version: 'v2.0.0', // Future-proofing
          model_name: 'gemini-2.5-flash',
          status: 'processing'
        }).select().single();
        
        if (runData) {
          runId = runData.id;
          
          // Update project's latest_run_id
          await supabaseClient.from('projects')
            .update({ latest_run_id: runId })
            .eq('id', input.projectId);
        }
      }
    }

    // Configure Server-Sent Events headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Flush headers to establish stream
    res.flushHeaders();

    const startTime = Date.now();

    // The callback streams data immediately as it resolves
    await generateKitArtifacts(input, supabaseClient, runId, (artifactName, data, error) => {
      const payload = JSON.stringify({
        artifact: artifactName,
        data,
        error
      });
      res.write(`data: ${payload}\n\n`);
    });

    const duration = Date.now() - startTime;
    
    // Update run as completed
    if (supabaseClient && runId) {
      await supabaseClient.from('generation_runs').update({
        status: 'completed',
        duration_ms: duration,
        completed_at: new Date().toISOString()
      }).eq('id', runId);
    }

    // We could log metrics here to a database or monitoring service
    res.write(`data: ${JSON.stringify({ event: 'done', metrics: { duration } })}\n\n`);

    res.end();
  } catch (error: any) {
    console.error('API Error:', error);
    // If headers haven't been sent, we can send a 500. Otherwise we just close the stream.
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message || 'Internal Server Error' })}\n\n`);
      res.end();
    }
  }
}
