import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { WaitlistSignupSchema } from '@/lib/validation';
import { checkRateLimit, getClientIp, RateLimitError } from './lib/rate-limiter';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup — reflect the request origin rather than wildcard+credentials
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
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

  // ── Rate limiting: 10 signups per minute per IP (shared store, fail-closed) ──
  const ip = getClientIp(req);
  let rateLimit: Awaited<ReturnType<typeof checkRateLimit>>;
  try {
    rateLimit = await checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 });
  } catch (err) {
    if (err instanceof RateLimitError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    throw err;
  }
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfter ?? 60));
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  // ── Server-side validation (source of truth) ──
  const validation = WaitlistSignupSchema.safeParse(req.body);
  if (!validation.success) {
    console.log('[waitlist] validation failed');
    res.status(400).json({ error: validation.error.issues[0]?.message ?? 'Invalid request data' });
    return;
  }

  const { email, product, full_name, company_name, role } = validation.data;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('[waitlist] missing supabase configuration');
    res.status(503).json({ error: 'Signup could not be saved. Please try again later.' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from('leads').insert({
    email,
    product,
    full_name: full_name || null,
    company_name: company_name || null,
    role: role || null,
  });

  if (error) {
    if (error.code === '23505') {
      // Unique violation — already registered, idempotent
      console.log('[waitlist] duplicate signup ignored');
      res.status(200).json({ success: true, message: 'Already registered' });
      return;
    }
    console.log('[waitlist] database save failed');
    res.status(503).json({ error: 'Signup could not be saved. Please try again later.' });
    return;
  }

  console.log('[waitlist] signup saved', { product });
  res.status(200).json({ success: true });
}
