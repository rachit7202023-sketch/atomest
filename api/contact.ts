import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { ContactInquirySchema } from './lib/validation';
import { checkRateLimit, getClientIp, RateLimitError } from './server/lib/rate-limiter';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup — reflect the request origin rather than wildcard+credentials
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
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

  // ── Rate limiting: 5 submissions per minute per IP (shared store, fail-closed) ──
  const ip = getClientIp(req);
  let rateLimit: Awaited<ReturnType<typeof checkRateLimit>>;
  try {
    rateLimit = await checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
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
  const validation = ContactInquirySchema.safeParse(req.body);
  if (!validation.success) {
    console.log('[contact] validation failed');
    res.status(400).json({ error: validation.error.issues[0]?.message ?? 'Invalid request data' });
    return;
  }

  const { fullName, email, company, website, solution, description, budget } = validation.data;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('[contact] missing supabase configuration');
    res.status(503).json({ error: 'Enquiry could not be saved. Please try again later.' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Persist inquiry to leads table with structured solution metadata
  const { error } = await supabase.from('leads').insert({
    email,
    product: `inquiry-${solution || 'general'}`,
    full_name: fullName,
    company_name: company ? `${company}${website ? ` (${website})` : ''}` : (website || null),
    role: `Budget: ${budget || 'Unspecified'} | ${description.slice(0, 300)}`,
  });

  if (error) {
    if (error.code === '23505') {
      // Duplicate (same email + product) — already saved previously, idempotent
      console.log('[contact] duplicate submission ignored');
      res.status(200).json({ success: true, message: 'Your enquiry is already on file.', saved: true });
      return;
    }
    console.log('[contact] database save failed');
    res.status(503).json({ error: 'Enquiry could not be saved. Please try again later.' });
    return;
  }

  // Structured log — no personal data
  console.log('[contact] inquiry saved', { solution, hasBudget: Boolean(budget) });

  res.status(200).json({
    success: true,
    message: 'Consultation request received. Our team will review your project and get back to you within 24 hours.',
    saved: true,
  });
}
