-- Fix security vulnerability in students table RLS policy
-- Remove the potentially manipulable app.current_enrollment setting access

-- First, drop the existing vulnerable policy
DROP POLICY IF EXISTS "Students can view their own profile" ON public.students;

-- Create a secure policy that only relies on auth.uid()
-- This assumes that the students.id should match auth.uid() for proper user isolation
CREATE POLICY "Students can view their own profile" 
ON public.students 
FOR SELECT 
USING (auth.uid() = id);

-- Also update the update policy to be consistent and secure
DROP POLICY IF EXISTS "Students can update their own profile" ON public.students;

CREATE POLICY "Students can update their own profile" 
ON public.students 
FOR UPDATE 
USING (auth.uid() = id);

-- Remove the vulnerable policy from auth_sessions table as well
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.auth_sessions;

-- Create a secure session policy that directly links to auth.uid()
-- We need to ensure student_id in auth_sessions matches auth.uid()
CREATE POLICY "Users can view their own sessions" 
ON public.auth_sessions 
FOR SELECT 
USING (student_id = auth.uid());

-- Add a policy to allow users to insert their own sessions (needed for authentication)
CREATE POLICY "Users can create their own sessions" 
ON public.auth_sessions 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

-- Add a policy to allow users to delete their own sessions (needed for logout)
CREATE POLICY "Users can delete their own sessions" 
ON public.auth_sessions 
FOR DELETE 
USING (student_id = auth.uid());

-- Add a policy to allow users to update their own sessions (needed for session refresh)
CREATE POLICY "Users can update their own sessions" 
ON public.auth_sessions 
FOR UPDATE 
USING (student_id = auth.uid());