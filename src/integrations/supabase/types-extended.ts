// Extended Database Types for Supabase Tables
// Generated types for the new mock data tables

export interface Database {
  public: {
    Tables: {
      // Existing tables
      students: {
        Row: {
          id: string;
          enrollment_no: string;
          password_hash: string | null;
          first_name: string | null;
          last_name: string | null;
          department: string | null;
          year_of_study: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enrollment_no: string;
          password_hash?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          department?: string | null;
          year_of_study?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          enrollment_no?: string;
          password_hash?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          department?: string | null;
          year_of_study?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      auth_sessions: {
        Row: {
          id: string;
          student_id: string;
          session_token: string;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          session_token: string;
          expires_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          session_token?: string;
          expires_at?: string;
          created_at?: string;
        };
      };
      // New tables
      mock_tests: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          duration: number;
          total_questions: number;
          total_marks: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          subjects: string[];
          attempts: number;
          average_score: number;
          best_score: number;
          last_attempted: string | null;
          is_completed: boolean;
          time_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          duration: number;
          total_questions: number;
          total_marks: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          subjects: string[];
          attempts?: number;
          average_score?: number;
          best_score?: number;
          last_attempted?: string | null;
          is_completed?: boolean;
          time_limit: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          duration?: number;
          total_questions?: number;
          total_marks?: number;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          subjects?: string[];
          attempts?: number;
          average_score?: number;
          best_score?: number;
          last_attempted?: string | null;
          is_completed?: boolean;
          time_limit?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      speed_tests: {
        Row: {
          id: string;
          title: string;
          subject: string;
          topic: string;
          duration: number;
          total_questions: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          attempts: number;
          best_time: number | null;
          best_score: number | null;
          average_accuracy: number;
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          topic: string;
          duration: number;
          total_questions: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          attempts?: number;
          best_time?: number | null;
          best_score?: number | null;
          average_accuracy?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          topic?: string;
          duration?: number;
          total_questions?: number;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          attempts?: number;
          best_time?: number | null;
          best_score?: number | null;
          average_accuracy?: number;
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      test_results: {
        Row: {
          id: string;
          student_id: string;
          test_id: string;
          test_type: 'mock_test' | 'speed_test';
          score: number;
          max_score: number;
          completion_percentage: number;
          time_taken_minutes: number;
          total_time_minutes: number;
          questions_attempted: number;
          correct_answers: number;
          incorrect_answers: number;
          attempted_at: string;
          completed_at: string | null;
          is_completed: boolean;
        };
        Insert: {
          id?: string;
          student_id: string;
          test_id: string;
          test_type: 'mock_test' | 'speed_test';
          score: number;
          max_score: number;
          completion_percentage: number;
          time_taken_minutes: number;
          total_time_minutes: number;
          questions_attempted: number;
          correct_answers: number;
          incorrect_answers: number;
          attempted_at?: string;
          completed_at?: string | null;
          is_completed?: boolean;
        };
        Update: {
          id?: string;
          student_id?: string;
          test_id?: string;
          test_type?: 'mock_test' | 'speed_test';
          score?: number;
          max_score?: number;
          completion_percentage?: number;
          time_taken_minutes?: number;
          total_time_minutes?: number;
          questions_attempted?: number;
          correct_answers?: number;
          incorrect_answers?: number;
          attempted_at?: string;
          completed_at?: string | null;
          is_completed?: boolean;
        };
      };
      previous_year_papers: {
        Row: {
          id: string;
          year: number;
          exam_name: string;
          branch: string;
          paper_code: string;
          total_questions: number;
          total_marks: number;
          duration: number;
          difficulty: 'Medium' | 'Hard';
          subjects_covered: string[];
          download_count: number;
          average_score: number;
          attempts: number;
          file_size: string | null;
          file_format: string;
          has_solutions: boolean;
          has_video_solutions: boolean;
          is_premium: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year: number;
          exam_name: string;
          branch: string;
          paper_code: string;
          total_questions: number;
          total_marks: number;
          duration: number;
          difficulty: 'Medium' | 'Hard';
          subjects_covered: string[];
          download_count?: number;
          average_score?: number;
          attempts?: number;
          file_size?: string | null;
          file_format?: string;
          has_solutions?: boolean;
          has_video_solutions?: boolean;
          is_premium?: boolean;
          tags: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          year?: number;
          exam_name?: string;
          branch?: string;
          paper_code?: string;
          total_questions?: number;
          total_marks?: number;
          duration?: number;
          difficulty?: 'Medium' | 'Hard';
          subjects_covered?: string[];
          download_count?: number;
          average_score?: number;
          attempts?: number;
          file_size?: string | null;
          file_format?: string;
          has_solutions?: boolean;
          has_video_solutions?: boolean;
          is_premium?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      subject_resources: {
        Row: {
          id: string;
          title: string;
          subject: string;
          branch: string;
          type: 'lecture_notes' | 'video_lectures' | 'practice_problems' | 'formula_sheets' | 'quick_revision' | 'conceptual_notes' | 'solved_examples';
          description: string | null;
          content_format: string;
          difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
          estimated_duration: string | null;
          file_size: string | null;
          download_count: number;
          rating: number;
          total_ratings: number;
          is_free: boolean;
          prerequisites: string[];
          learning_outcomes: string[];
          created_by: string | null;
          view_count: number;
          is_featured: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subject: string;
          branch: string;
          type: 'lecture_notes' | 'video_lectures' | 'practice_problems' | 'formula_sheets' | 'quick_revision' | 'conceptual_notes' | 'solved_examples';
          description?: string | null;
          content_format?: string;
          difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
          estimated_duration?: string | null;
          file_size?: string | null;
          download_count?: number;
          rating?: number;
          total_ratings?: number;
          is_free?: boolean;
          prerequisites: string[];
          learning_outcomes: string[];
          created_by?: string | null;
          view_count?: number;
          is_featured?: boolean;
          tags: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subject?: string;
          branch?: string;
          type?: 'lecture_notes' | 'video_lectures' | 'practice_problems' | 'formula_sheets' | 'quick_revision' | 'conceptual_notes' | 'solved_examples';
          description?: string | null;
          content_format?: string;
          difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
          estimated_duration?: string | null;
          file_size?: string | null;
          download_count?: number;
          rating?: number;
          total_ratings?: number;
          is_free?: boolean;
          prerequisites?: string[];
          learning_outcomes?: string[];
          created_by?: string | null;
          view_count?: number;
          is_featured?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      study_plans: {
        Row: {
          id: string;
          title: string;
          branch: string;
          type: '30_day_crash_course' | '60_day_comprehensive' | '120_day_complete' | 'subject_wise_intensive' | 'revision_bootcamp';
          duration_days: number;
          description: string | null;
          subjects_covered: string[];
          daily_hours: number;
          total_topics: number;
          mock_tests_included: number;
          difficulty_progression: string;
          price: number;
          enrolled_students: number;
          completion_rate: number;
          average_score_improvement: number;
          created_by: string;
          is_popular: boolean;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          branch: string;
          type: '30_day_crash_course' | '60_day_comprehensive' | '120_day_complete' | 'subject_wise_intensive' | 'revision_bootcamp';
          duration_days: number;
          description?: string | null;
          subjects_covered: string[];
          daily_hours: number;
          total_topics: number;
          mock_tests_included: number;
          difficulty_progression?: string;
          price?: number;
          enrolled_students?: number;
          completion_rate?: number;
          average_score_improvement?: number;
          created_by?: string;
          is_popular?: boolean;
          tags: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          branch?: string;
          type?: '30_day_crash_course' | '60_day_comprehensive' | '120_day_complete' | 'subject_wise_intensive' | 'revision_bootcamp';
          duration_days?: number;
          description?: string | null;
          subjects_covered?: string[];
          daily_hours?: number;
          total_topics?: number;
          mock_tests_included?: number;
          difficulty_progression?: string;
          price?: number;
          enrolled_students?: number;
          completion_rate?: number;
          average_score_improvement?: number;
          created_by?: string;
          is_popular?: boolean;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Type helpers for easier usage
export type MockTest = Database['public']['Tables']['mock_tests']['Row'];
export type SpeedTest = Database['public']['Tables']['speed_tests']['Row'];
export type TestResult = Database['public']['Tables']['test_results']['Row'];
export type PreviousYearPaper = Database['public']['Tables']['previous_year_papers']['Row'];
export type SubjectResource = Database['public']['Tables']['subject_resources']['Row'];
export type StudyPlan = Database['public']['Tables']['study_plans']['Row'];
export type Student = Database['public']['Tables']['students']['Row'];

// Insert types
export type MockTestInsert = Database['public']['Tables']['mock_tests']['Insert'];
export type SpeedTestInsert = Database['public']['Tables']['speed_tests']['Insert'];
export type TestResultInsert = Database['public']['Tables']['test_results']['Insert'];
export type PreviousYearPaperInsert = Database['public']['Tables']['previous_year_papers']['Insert'];
export type SubjectResourceInsert = Database['public']['Tables']['subject_resources']['Insert'];
export type StudyPlanInsert = Database['public']['Tables']['study_plans']['Insert'];