-- Migration: 0003_recruiter_ai_schema.sql
-- Description: Establishes a true relational Candidate intelligence model.

-- 1. Candidates Table
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  
  -- Deterministic Fields
  name TEXT,
  email TEXT,
  phone TEXT,
  
  -- Extracted / Normalized AI Data
  raw_text TEXT NOT NULL,
  parsed_data JSONB DEFAULT '{}'::jsonb, -- The raw output from the extraction prompt
  normalized_skills JSONB DEFAULT '[]'::jsonb,
  normalized_experience JSONB DEFAULT '[]'::jsonb,
  normalized_education JSONB DEFAULT '[]'::jsonb,
  normalized_projects JSONB DEFAULT '[]'::jsonb,
  normalized_certifications JSONB DEFAULT '[]'::jsonb,
  normalized_timeline JSONB DEFAULT '[]'::jsonb,
  normalized_summary TEXT,
  
  -- Match Scoring
  match_score INTEGER,
  match_reasoning JSONB DEFAULT '{}'::jsonb, -- e.g. { "Technical": "...", "Risk": "...", "Confidence": "..." }
  recommendation TEXT CHECK (recommendation IN ('Highly Recommended', 'Recommended', 'Worth Interviewing', 'Needs Review', 'Low Match')),
  
  -- Workflow / Stage
  stage TEXT DEFAULT 'Sourced' NOT NULL CHECK (stage IN ('Sourced', 'Screened', 'Interviewing', 'Offer', 'Rejected')),
  status TEXT DEFAULT 'processing' NOT NULL CHECK (status IN ('processing', 'completed', 'parsing_failed')),
  
  -- ATS Integrations (V1 placeholders)
  external_ats_id TEXT,
  source TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast roster queries
CREATE INDEX IF NOT EXISTS idx_candidates_project_id ON public.candidates(project_id);

-- 2. Ensure projects table can store structured JD
-- Adding structured_jd column to projects if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'projects'
          AND column_name = 'structured_jd'
    ) THEN
        ALTER TABLE public.projects ADD COLUMN structured_jd JSONB;
    END IF;
END $$;
