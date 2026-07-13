-- Migration: 0002_waitlist_schema.sql
-- Description: Waitlist table for tracking early access requests across products.

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(email, product)
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (anon or authenticated)
CREATE POLICY "Anyone can join waitlist" ON public.waitlist FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can view the waitlist, or we just disable SELECT for now.
CREATE POLICY "No one can read waitlist via client" ON public.waitlist FOR SELECT USING (false);
