-- Extended Mock Data Tables for GATE CLUB Platform
-- Create additional tables to support the platform features

-- Create mock_tests table
CREATE TABLE public.mock_tests (
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
CREATE TABLE public.speed_tests (
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
CREATE TABLE public.test_results (
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
CREATE TABLE public.previous_year_papers (
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
CREATE TABLE public.subject_resources (
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
CREATE TABLE public.study_plans (
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
CREATE POLICY "Students can view their own test results" 
ON public.test_results 
FOR SELECT 
USING (student_id = auth.uid());

CREATE POLICY "Students can create their own test results" 
ON public.test_results 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

-- Create policies for other tables (read-only for students)
CREATE POLICY "Students can view mock tests" 
ON public.mock_tests 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Students can view speed tests" 
ON public.speed_tests 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Students can view previous year papers" 
ON public.previous_year_papers 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Students can view subject resources" 
ON public.subject_resources 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Students can view study plans" 
ON public.study_plans 
FOR SELECT 
TO authenticated 
USING (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_mock_tests_updated_at
  BEFORE UPDATE ON public.mock_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_speed_tests_updated_at
  BEFORE UPDATE ON public.speed_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_previous_year_papers_updated_at
  BEFORE UPDATE ON public.previous_year_papers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subject_resources_updated_at
  BEFORE UPDATE ON public.subject_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();