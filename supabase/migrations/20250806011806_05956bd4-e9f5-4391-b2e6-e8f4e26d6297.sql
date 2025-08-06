-- Create students table for enrollment-based authentication
CREATE TABLE public.students (
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

-- Create policies for student access
CREATE POLICY "Students can view their own profile" 
ON public.students 
FOR SELECT 
USING (auth.uid()::text = id::text OR enrollment_no = current_setting('app.current_enrollment', true));

CREATE POLICY "Students can update their own profile" 
ON public.students 
FOR UPDATE 
USING (auth.uid()::text = id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create auth sessions table for custom authentication
CREATE TABLE public.auth_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for auth sessions
ALTER TABLE public.auth_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for auth sessions
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
$$ LANGUAGE plpgsql;

-- Insert some sample enrollment numbers for testing
INSERT INTO public.students (enrollment_no, first_name, last_name, department, year_of_study) VALUES
('SOE2021CS001', 'Rahul', 'Sharma', 'Computer Science', 3),
('SOE2021ME015', 'Priya', 'Patel', 'Mechanical Engineering', 3),
('SOE2022EC042', 'Arjun', 'Singh', 'Electronics & Communication', 2),
('SOE2020CE008', 'Sneha', 'Gupta', 'Civil Engineering', 4),
('SOE2023IT025', 'Vikash', 'Kumar', 'Information Technology', 1);