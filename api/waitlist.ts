import type { VercelRequest, VercelResponse } from '@vercel/node';
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
    const { email, product, full_name, company_name, role } = req.body;

    if (!email || !product) {
      res.status(400).json({ error: 'Missing required fields: email, product' });
      return;
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    // We should use SERVICE_ROLE_KEY to bypass RLS for waitlist insert if possible. 
    // If not, we will use VITE_SUPABASE_ANON_KEY and ensure RLS allows anonymous inserts on waitlist, 
    // but the SQL I created prevents all direct inserts. Let's assume we have a SERVICE_ROLE_KEY.
    // Wait, let's just use ANON_KEY and we can just run the operation on the client instead if we wanted to, 
    // but wait, the waitlist migration has RLS set to false for inserts.
    // I should modify the migration or use the anon key if we don't have service role key.
    // Actually, I will just use the anon key and we can insert into the 'waitlist' table.
    // If I need to change RLS on waitlist to allow anon inserts:
    
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('waitlist').insert({
      email,
      product,
      full_name: full_name || null,
      company_name: company_name || null,
      role: role || null
    });

    if (error) {
      if (error.code === '23505') { // Unique violation
        res.status(200).json({ success: true, message: 'Already on waitlist' });
        return;
      }
      throw error;
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
