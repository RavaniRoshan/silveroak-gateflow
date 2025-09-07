import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { 
  MockTest, 
  SpeedTest, 
  TestResult, 
  PreviousYearPaper, 
  SubjectResource, 
  StudyPlan,
  MockTestInsert,
  SpeedTestInsert,
  TestResultInsert
} from '@/integrations/supabase/types-extended';

// Mock Tests Hooks
export const useMockTests = () => {
  return useQuery({
    queryKey: ['mockTests'],
    queryFn: async (): Promise<MockTest[]> => {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useMockTest = (id: string) => {
  return useQuery({
    queryKey: ['mockTest', id],
    queryFn: async (): Promise<MockTest | null> => {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateMockTestResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (result: TestResultInsert) => {
      const { data, error } = await supabase
        .from('test_results')
        .insert(result)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testResults'] });
      queryClient.invalidateQueries({ queryKey: ['mockTests'] });
    },
  });
};

// Speed Tests Hooks
export const useSpeedTests = () => {
  return useQuery({
    queryKey: ['speedTests'],
    queryFn: async (): Promise<SpeedTest[]> => {
      const { data, error } = await supabase
        .from('speed_tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useSpeedTestsBySubject = (subject: string) => {
  return useQuery({
    queryKey: ['speedTests', 'subject', subject],
    queryFn: async (): Promise<SpeedTest[]> => {
      const { data, error } = await supabase
        .from('speed_tests')
        .select('*')
        .eq('subject', subject)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!subject,
  });
};

export const useSpeedTest = (id: string) => {
  return useQuery({
    queryKey: ['speedTest', id],
    queryFn: async (): Promise<SpeedTest | null> => {
      const { data, error } = await supabase
        .from('speed_tests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateSpeedTestResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (result: TestResultInsert) => {
      const { data, error } = await supabase
        .from('test_results')
        .insert(result)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testResults'] });
      queryClient.invalidateQueries({ queryKey: ['speedTests'] });
    },
  });
};

// Test Results Hooks
export const useTestResults = (studentId?: string) => {
  return useQuery({
    queryKey: ['testResults', studentId],
    queryFn: async (): Promise<TestResult[]> => {
      let query = supabase
        .from('test_results')
        .select('*')
        .order('attempted_at', { ascending: false });
      
      if (studentId) {
        query = query.eq('student_id', studentId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId,
  });
};

export const useTestResultsByTest = (testId: string, testType: 'mock_test' | 'speed_test') => {
  return useQuery({
    queryKey: ['testResults', 'test', testId, testType],
    queryFn: async (): Promise<TestResult[]> => {
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('test_id', testId)
        .eq('test_type', testType)
        .order('attempted_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!testId && !!testType,
  });
};

// Previous Year Papers Hooks
export const usePreviousYearPapers = (branch?: string) => {
  return useQuery({
    queryKey: ['previousYearPapers', branch],
    queryFn: async (): Promise<PreviousYearPaper[]> => {
      let query = supabase
        .from('previous_year_papers')
        .select('*')
        .order('year', { ascending: false });
      
      if (branch) {
        query = query.eq('branch', branch);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const usePreviousYearPapersByYear = (year: number) => {
  return useQuery({
    queryKey: ['previousYearPapers', 'year', year],
    queryFn: async (): Promise<PreviousYearPaper[]> => {
      const { data, error } = await supabase
        .from('previous_year_papers')
        .select('*')
        .eq('year', year)
        .order('branch');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!year,
  });
};

// Subject Resources Hooks
export const useSubjectResources = (branch?: string, subject?: string) => {
  return useQuery({
    queryKey: ['subjectResources', branch, subject],
    queryFn: async (): Promise<SubjectResource[]> => {
      let query = supabase
        .from('subject_resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (branch) {
        query = query.eq('branch', branch);
      }
      
      if (subject) {
        query = query.eq('subject', subject);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useFeaturedSubjectResources = () => {
  return useQuery({
    queryKey: ['subjectResources', 'featured'],
    queryFn: async (): Promise<SubjectResource[]> => {
      const { data, error } = await supabase
        .from('subject_resources')
        .select('*')
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useSubjectResourcesByType = (type: string) => {
  return useQuery({
    queryKey: ['subjectResources', 'type', type],
    queryFn: async (): Promise<SubjectResource[]> => {
      const { data, error } = await supabase
        .from('subject_resources')
        .select('*')
        .eq('type', type)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!type,
  });
};

// Study Plans Hooks
export const useStudyPlans = (branch?: string) => {
  return useQuery({
    queryKey: ['studyPlans', branch],
    queryFn: async (): Promise<StudyPlan[]> => {
      let query = supabase
        .from('study_plans')
        .select('*')
        .order('enrolled_students', { ascending: false });
      
      if (branch) {
        query = query.eq('branch', branch);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const usePopularStudyPlans = () => {
  return useQuery({
    queryKey: ['studyPlans', 'popular'],
    queryFn: async (): Promise<StudyPlan[]> => {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .eq('is_popular', true)
        .order('enrolled_students', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useStudyPlansByType = (type: string) => {
  return useQuery({
    queryKey: ['studyPlans', 'type', type],
    queryFn: async (): Promise<StudyPlan[]> => {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .eq('type', type)
        .order('enrolled_students', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!type,
  });
};

// Statistics Hooks
export const useTestStatistics = (studentId?: string) => {
  return useQuery({
    queryKey: ['testStatistics', studentId],
    queryFn: async () => {
      let query = supabase
        .from('test_results')
        .select('*');
      
      if (studentId) {
        query = query.eq('student_id', studentId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      const mockTests = data?.filter(r => r.test_type === 'mock_test') || [];
      const speedTests = data?.filter(r => r.test_type === 'speed_test') || [];
      
      return {
        totalMockTests: mockTests.length,
        completedMockTests: mockTests.filter(t => t.is_completed).length,
        totalSpeedTests: speedTests.length,
        completedSpeedTests: speedTests.filter(t => t.is_completed).length,
        averageMockScore: mockTests.length > 0 
          ? Math.round(mockTests.reduce((acc, t) => acc + t.score, 0) / mockTests.length)
          : 0,
        averageSpeedAccuracy: speedTests.length > 0 
          ? Math.round(speedTests.reduce((acc, t) => acc + t.score, 0) / speedTests.length)
          : 0,
      };
    },
    enabled: !!studentId,
  });
};