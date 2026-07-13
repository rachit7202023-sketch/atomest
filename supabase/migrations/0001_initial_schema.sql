-- Migration: 0001_initial_schema.sql
-- Description: Core architecture for Atomest AI Products (Profiles, Projects, Runs, Artifacts, Attachments, Activity)
-- Idempotent setup: safely uses "IF NOT EXISTS"

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Projects Table (Generic reusable structure)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_type TEXT NOT NULL, -- e.g., 'recruiter-ai', 'sales-ai'
  title TEXT NOT NULL,
  
  -- RecruiterAI Specific JSONB Payload (can be genericized later)
  input_data JSONB DEFAULT '{}'::jsonb NOT NULL, 
  
  status TEXT DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'archived', 'trash')),
  latest_run_id UUID, -- References generation_runs(id), added later to avoid circular dependency
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ -- For soft deletion
);

-- 3. Generation Runs (Tracks every AI attempt)
CREATE TABLE IF NOT EXISTS public.generation_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  prompt_version TEXT NOT NULL,
  model_name TEXT NOT NULL,
  
  duration_ms INTEGER,
  retry_count INTEGER DEFAULT 0 NOT NULL,
  token_usage JSONB DEFAULT '{}'::jsonb,
  
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- Add latest_run_id constraint to projects now that generation_runs exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'fk_latest_run'
          AND table_name = 'projects'
          AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.projects 
        ADD CONSTRAINT fk_latest_run 
        FOREIGN KEY (latest_run_id) 
        REFERENCES public.generation_runs(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 4. Generation Artifacts (Stores independent outputs)
CREATE TABLE IF NOT EXISTS public.generation_artifacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  run_id UUID REFERENCES public.generation_runs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  artifact_type TEXT NOT NULL, -- e.g., 'linkedin_post', 'interview_questions'
  content JSONB NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  UNIQUE(project_id, artifact_type) -- Ensure only one active artifact of each type per project
);

-- 5. Attachments Table (For future resume uploads, etc.)
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Activity Log
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  
  event_type TEXT NOT NULL, -- e.g., 'project_created', 'artifact_generated'
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Trigger for Auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_artifacts_updated_at ON public.generation_artifacts;
CREATE TRIGGER update_artifacts_updated_at BEFORE UPDATE ON public.generation_artifacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Trigger for Auto-creating Profile on Auth User Creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safe trigger creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Projects: Users can CRUD their own projects
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Generation Runs
CREATE POLICY "Users can view own runs" ON public.generation_runs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create runs" ON public.generation_runs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own runs" ON public.generation_runs FOR UPDATE USING (auth.uid() = user_id);

-- Generation Artifacts
CREATE POLICY "Users can view own artifacts" ON public.generation_artifacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create artifacts" ON public.generation_artifacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own artifacts" ON public.generation_artifacts FOR UPDATE USING (auth.uid() = user_id);

-- Attachments
CREATE POLICY "Users can view own attachments" ON public.attachments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create attachments" ON public.attachments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own attachments" ON public.attachments FOR DELETE USING (auth.uid() = user_id);

-- Activity Log
CREATE POLICY "Users can view own activity" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create activity" ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);
