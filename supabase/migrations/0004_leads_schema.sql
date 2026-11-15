-- Migration: 0004_leads_schema.sql
-- Description: Leads table for contact form submissions and service enquiries.
-- Supports Atomest 2.0 service-led business model.
-- Idempotent setup: IF NOT EXISTS for the table; DROP POLICY IF EXISTS +
-- CREATE POLICY so the migration can be re-run safely.
--
-- NOTE: This migration is NOT applied to the remote project here. It must be
-- applied via the Supabase dashboard/CLI only after explicit authorization.

-- gen_random_uuid() is native in Postgres 13+ (Supabase runs PG 14+), so no
-- pgcrypto extension is required here.

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(email, product)
);

-- Enable RLS. No client role (anon or authenticated) can read or modify leads.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (incl. anon) may submit a lead. Intended for the public contact form.
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.leads;
CREATE POLICY "Anyone can submit lead" ON public.leads FOR INSERT WITH CHECK (true);

-- No client role can read submitted leads via the client-side Supabase client.
-- Service-role (server-side only, bypasses RLS) manages all lead access via API.
DROP POLICY IF EXISTS "No one can read leads via client" ON public.leads;
CREATE POLICY "No one can read leads via client" ON public.leads FOR SELECT USING (false);

-- No UPDATE or DELETE policies exist: no client role can modify submitted leads.

-- Index for fast lookup by email/product (dedup key) and recent-first listing.
CREATE INDEX IF NOT EXISTS idx_leads_email_product ON public.leads(email, product);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

COMMENT ON TABLE public.leads IS 'Contact-form and service-enquiry leads. Insertable by anyone (anon); not readable or modifiable by any client role. Service-role (server-side only) manages all access.';
COMMENT ON COLUMN public.leads.email IS 'Submitter email (part of the unique dedup key with product).';
COMMENT ON COLUMN public.leads.product IS 'Product/service the lead inquired about (part of the unique dedup key with email).';
