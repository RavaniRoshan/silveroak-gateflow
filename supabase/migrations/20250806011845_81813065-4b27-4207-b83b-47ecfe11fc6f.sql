-- Fix function search path security issues by dropping and recreating with proper dependencies
DROP TRIGGER IF EXISTS update_students_updated_at ON public.students;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Recreate function with proper security settings
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Recreate the trigger
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fix cleanup function
DROP FUNCTION IF EXISTS public.cleanup_expired_sessions();
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM public.auth_sessions WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';