-- Complete Migration Script for GATE CLUB Platform
-- Execute this script in the Supabase Dashboard SQL Editor
-- This script applies all migrations in order

-- ================================================
-- MIGRATION 1: Initial students and auth tables
-- ================================================

-- Create students table for enrollment-based authentication
CREATE TABLE IF NOT EXISTS public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_no TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  first_name TEXT,
  last_name TEXT,
  department TEXT,
  year_of_study INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for student access (drop if exists first)
DROP POLICY IF EXISTS "Students can view their own profile" ON public.students;
CREATE POLICY "Students can view their own profile" 
ON public.students 
FOR SELECT 
USING (auth.uid()::text = id::text OR enrollment_no = current_setting('app.current_enrollment', true));

DROP POLICY IF EXISTS "Students can update their own profile" ON public.students;
CREATE POLICY "Students can update their own profile" 
ON public.students 
FOR UPDATE 
USING (auth.uid()::text = id::text);

-- Create function to update timestamps (with proper security)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_students_updated_at ON public.students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create auth sessions table for custom authentication
CREATE TABLE IF NOT EXISTS public.auth_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for auth sessions
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for auth sessions
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.auth_sessions;
CREATE POLICY "Users can view their own sessions" 
ON public.auth_sessions 
FOR SELECT 
USING (student_id = (SELECT id FROM public.students WHERE enrollment_no = current_setting('app.current_enrollment', true)));

-- Create function to clean expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM public.auth_sessions WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Insert sample enrollment numbers for testing (only if not exists)
INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) 
SELECT 'SOE2021CS001', 'Rahul', 'Sharma', 'Computer Science', 3
WHERE NOT EXISTS (SELECT 1 FROM public.students WHERE enrollment_no = 'SOE2021CS001');

INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) 
SELECT 'SOE2021ME015', 'Priya', 'Patel', 'Mechanical Engineering', 3
WHERE NOT EXISTS (SELECT 1 FROM public.students WHERE enrollment_no = 'SOE2021ME015');

INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) 
SELECT 'SOE2022EC042', 'Arjun', 'Singh', 'Electronics & Communication', 2
WHERE NOT EXISTS (SELECT 1 FROM public.students WHERE enrollment_no = 'SOE2022EC042');

INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) 
SELECT 'SOE2020CE008', 'Sneha', 'Gupta', 'Civil Engineering', 4
WHERE NOT EXISTS (SELECT 1 FROM public.students WHERE enrollment_no = 'SOE2020CE008');

INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) 
SELECT 'SOE2023IT025', 'Vikash', 'Kumar', 'Information Technology', 1
WHERE NOT EXISTS (SELECT 1 FROM public.students WHERE enrollment_no = 'SOE2023IT025');

-- ================================================
-- MIGRATION 2: Extended Mock Data Tables
-- ================================================

-- Create mock_tests table
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minutes
  total_questions INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  subjects TEXT[], -- array of subjects
  attempts INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  best_score DECIMAL(5,2) DEFAULT 0,
  last_attempted TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  time_limit INTEGER NOT NULL, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create speed_tests table
CREATE TABLE IF NOT EXISTS public.speed_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  total_questions INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  attempts INTEGER DEFAULT 0,
  best_time INTEGER, -- in seconds
  best_score DECIMAL(5,2),
  average_accuracy DECIMAL(5,2) DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  test_id UUID NOT NULL, -- references either mock_tests or speed_tests
  test_type TEXT CHECK (test_type IN ('mock_test', 'speed_test')) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  max_score INTEGER NOT NULL,
  completion_percentage DECIMAL(5,2) NOT NULL,
  time_taken_minutes DECIMAL(8,2) NOT NULL,
  total_time_minutes INTEGER NOT NULL,
  questions_attempted INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  incorrect_answers INTEGER NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false
);

-- Create previous_year_papers table
CREATE TABLE IF NOT EXISTS public.previous_year_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  exam_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  paper_code TEXT NOT NULL UNIQUE,
  total_questions INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  difficulty TEXT CHECK (difficulty IN ('Medium', 'Hard')) NOT NULL,
  subjects_covered TEXT[],
  download_count INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  file_size TEXT,
  file_format TEXT DEFAULT 'PDF',
  has_solutions BOOLEAN DEFAULT false,
  has_video_solutions BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subject_resources table
CREATE TABLE IF NOT EXISTS public.subject_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  branch TEXT NOT NULL,
  type TEXT CHECK (type IN ('lecture_notes', 'video_lectures', 'practice_problems', 'formula_sheets', 'quick_revision', 'conceptual_notes', 'solved_examples')) NOT NULL,
  description TEXT,
  content_format TEXT DEFAULT 'PDF',
  difficulty_level TEXT CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
  estimated_duration TEXT,
  file_size TEXT,
  download_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  total_ratings INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT true,
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  created_by TEXT,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study_plans table
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  branch TEXT NOT NULL,
  type TEXT CHECK (type IN ('30_day_crash_course', '60_day_comprehensive', '120_day_complete', 'subject_wise_intensive', 'revision_bootcamp')) NOT NULL,
  duration_days INTEGER NOT NULL,
  description TEXT,
  subjects_covered TEXT[],
  daily_hours INTEGER NOT NULL,
  total_topics INTEGER NOT NULL,
  mock_tests_included INTEGER NOT NULL,
  difficulty_progression TEXT DEFAULT 'Easy to Hard',
  price INTEGER DEFAULT 0,
  enrolled_students INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0,
  average_score_improvement DECIMAL(5,2) DEFAULT 0,
  created_by TEXT DEFAULT 'GATE CLUB Faculty Team',
  is_popular BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speed_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previous_year_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for test results (students can only access their own results)
DROP POLICY IF EXISTS "Students can view their own test results" ON public.test_results;
CREATE POLICY "Students can view their own test results" 
ON public.test_results 
FOR SELECT 
USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can create their own test results" ON public.test_results;
CREATE POLICY "Students can create their own test results" 
ON public.test_results 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

-- Create policies for other tables (read-only for students)
DROP POLICY IF EXISTS "Students can view mock tests" ON public.mock_tests;
CREATE POLICY "Students can view mock tests" 
ON public.mock_tests 
FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Students can view speed tests" ON public.speed_tests;
CREATE POLICY "Students can view speed tests" 
ON public.speed_tests 
FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Students can view previous year papers" ON public.previous_year_papers;
CREATE POLICY "Students can view previous year papers" 
ON public.previous_year_papers 
FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Students can view subject resources" ON public.subject_resources;
CREATE POLICY "Students can view subject resources" 
ON public.subject_resources 
FOR SELECT 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Students can view study plans" ON public.study_plans;
CREATE POLICY "Students can view study plans" 
ON public.study_plans 
FOR SELECT 
TO authenticated 
USING (true);

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_mock_tests_updated_at ON public.mock_tests;
CREATE TRIGGER update_mock_tests_updated_at
  BEFORE UPDATE ON public.mock_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_speed_tests_updated_at ON public.speed_tests;
CREATE TRIGGER update_speed_tests_updated_at
  BEFORE UPDATE ON public.speed_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_previous_year_papers_updated_at ON public.previous_year_papers;
CREATE TRIGGER update_previous_year_papers_updated_at
  BEFORE UPDATE ON public.previous_year_papers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_subject_resources_updated_at ON public.subject_resources;
CREATE TRIGGER update_subject_resources_updated_at
  BEFORE UPDATE ON public.subject_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_study_plans_updated_at ON public.study_plans;
CREATE TRIGGER update_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();