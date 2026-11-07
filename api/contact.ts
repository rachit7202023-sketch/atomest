import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    const { fullName, email, company, website, solution, description, budget } = req.body || {};

    if (!fullName || !email || !description) {
      res.status(400).json({ error: 'Missing required fields: fullName, email, and description are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email address provided.' });
      return;
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    let savedToDb = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        // Persist inquiry to waitlist/leads table with structured solution metadata
        const { error } = await supabase.from('waitlist').insert({
          email,
          product: `inquiry-${solution || 'general'}`,
          full_name: fullName,
          company_name: company ? `${company}${website ? ` (${website})` : ''}` : (website || null),
          role: `Budget: ${budget || 'Unspecified'} | ${description.slice(0, 300)}`
        });

        if (!error || error.code === '23505') {
          savedToDb = true;
        } else {
          console.warn('Supabase insert warning for inquiry:', error.message);
        }
      } catch (dbErr) {
        console.warn('Supabase connection warning:', dbErr);
      }
    }

    console.log(`[INQUIRY RECEIVED] From: ${fullName} <${email}>, Solution: ${solution}, Budget: ${budget}`);

    res.status(200).json({
      success: true,
      message: 'Consultation request received. Our team will review your project and get back to you within 24 hours.',
      saved: savedToDb,
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

